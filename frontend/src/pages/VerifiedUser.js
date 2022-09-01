import { Link } from "react-router-dom";

const VerifiedUser = () => {
  return (
    <div>
      <div>
        <h1>Congratulations you successfully verified your account 🎉🎉🎉</h1>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
};

export default VerifiedUser;
