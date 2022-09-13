import useTimer from "../../../hooks/useTimer";
import axios from "axios";

const EmailConfirmation = ({ userEmail, setResendError }) => {
  const { timer, clearTimer, getDeadTime } = useTimer();

  const handleResend = async () => {
    if (timer === "00:00") {
      clearTimer(getDeadTime());
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/signup/resendconfirmation`,
          {
            email: userEmail,
          }
        );
        setResendError("");
      } catch (err) {
        if (err.response.data.error) {
          setResendError(err.response.data.error);
        } else {
          setResendError("Something went wrong, please try again later");
        }
      }
    }
  };

  return (
    <div className="auth_cont_wrapper">
      <h1 className="text-[2.1rem] font-bold">You are almost done!!!</h1>
      <h2 className="text-[1.2rem]">
        We have sent you an email to{" "}
        <i>
          <b>{userEmail}</b>
        </i>
        , please confirm your account via link in the email to access your
        account
      </h2>
      <p className="text-[1.1rem]">Did not receive the email?</p>
      <div className="space-x-2 flex">
        <button
          onClick={handleResend}
          className={`text-white btn ${
            timer !== "00:00" &&
            "cursor-not-allowed bg-green-300 active:scale-100 active:bg-green-300"
          }`}
        >
          Resend
        </button>
        {timer !== "00:00" && (
          <p className="w-max text-red-600 p-2 bg-red-300 border-[1px] border-red-400 rounded-md">
            after {timer}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailConfirmation;
