const { User, Follow } = require("../models");

const toggleFollow = async (req, res, next) => {
  const { id } = req.params;
  const user_id = req.user;
  try {
    const follow = await Follow.toggleFollow(res, id, user_id);

    res.status(200).json({
      message: follow
        ? "Follow operation succeded"
        : "Unfollow operation succeded",
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

const getFollowsCount = async (req, res, next) => {
  const { id } = req.params;
  try {
    const followingCount = await Follow.followingCount(id);

    const followerCount = await Follow.followerCount(id);

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

    if (Follows.length <= 0) {
      return res.status(200).json({ following: followingsList });
    }

    await Follow.getFollowing(followingsList, followingIdList, id);

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

    if (follower.length <= 0) {
      return res.status(200).json({ followers: followersList });
    }

    await Follow.getFollowers(followersList, followingIdList, id);

    res.status(200).json({ followers: followersList });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Something went wrong, please try again later" });
  }
};

module.exports = {
  toggleFollow,
  getFollowsCount,
  getFollowing,
  getFollowers,
};
