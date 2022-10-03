const { User, ActivityLog, Follow } = require("../models");

const putfollowAndUnfollow = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const check = await Follow.findOne({
      where: { follower_id: user_id, following_id: id },
      order: [["createdAt", "DESC"]],
    });

    if (check && check.flag) {
      await Follow.update({ flag: false }, { where: { id: check.id } });
      await ActivityLog.create({
        relatable_id: check.id,
        relatable_type: "unfollows",
        user_id,
      });
      res.status(200).json({ message: "Unfollow operation succeded" });
    } else if (check && check.flag === false) {
      await Follow.update({ flag: true }, { where: { id: check.id } });
      await ActivityLog.create({
        relatable_id: check.id,
        relatable_type: "follows",
        user_id,
      });
      res.status(200).json({ message: "Follow operation succeded" });
    } else {
      const follow = await Follow.create({
        follower_id: user_id,
        following_id: id,
        flag: true,
      });
      await ActivityLog.create({
        relatable_id: follow.id,
        relatable_type: "follows",
        user_id: user_id,
      });
      res.status(200).json({ message: "Follow operation succeded" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowsCount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const following = await Follow.findAll({
      where: { follower_id: id, flag: true },
    });
    let followingCount = 0;
    await Promise.all(
      following.map(async ({ following_id }) => {
        const user = await User.findByPk(following_id);
        if (user) {
          followingCount++;
        }
      })
    );

    const follower = await Follow.findAll({
      where: { following_id: id, flag: true },
    });
    let followerCount = 0;
    await Promise.all(
      follower.map(async ({ follower_id }) => {
        const user = await User.findByPk(follower_id);
        if (user) {
          followerCount++;
        }
      })
    );

    res.status(200).json({
      followers: followerCount,
      following: followingCount,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowing = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  const followingsList = [];

  try {
    const followingIdList = await Follow.getFollowingIdLIst(user_id);

    const { Follows } = await User.findByPk(id, {
      include: [{ model: Follow, attributes: ["following_id", "flag"] }],
    });

    if (Follows.length > 0) {
      await Promise.all(
        Follows.map(async (follow) => {
          if (follow.flag) {
            const { id, first_name, last_name, email, avatar_url, deletedAt } =
              await User.findByPk(follow.following_id, { paranoid: false });
            if (deletedAt) {
              return;
            }
            if (followingIdList.includes(id)) {
              followingsList.push({
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                follows: true,
              });
            } else {
              followingsList.push({
                id,
                first_name,
                last_name,
                email,
                avatar_url,
                follows: false,
              });
            }
          }
        })
      );
    }

    res.status(200).json({ following: followingsList });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowers = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  const followersList = [];

  try {
    const followingIdList = await Follow.getFollowingIdLIst(user_id);

    const follower = await Follow.findAll({
      where: { following_id: id, flag: true },
      attributes: ["follower_id"],
    });

    if (follower.length > 0) {
      await Promise.all(
        follower.map(async (m) => {
          const { id, first_name, last_name, email, avatar_url } =
            await User.findByPk(m.follower_id);
          if (followingIdList.includes(id)) {
            followersList.push({
              id,
              first_name,
              last_name,
              email,
              avatar_url,
              follows: true,
            });
          } else {
            followersList.push({
              id,
              first_name,
              last_name,
              email,
              avatar_url,
              follows: false,
            });
          }
        })
      );
    }

    res.status(200).json({ followers: followersList });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = {
  putfollowAndUnfollow,
  getFollowsCount,
  getFollowing,
  getFollowers,
};
