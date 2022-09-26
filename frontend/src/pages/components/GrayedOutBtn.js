const GrayedOutBtn = ({ text, array }) => {
  return (
    <button
      className={`btn text-white ${
        !Object.keys(array).length > 0 &&
        "bg-gray-400 cursor-not-allowed active:bg-gray-400 active:scale-100"
      }`}
    >
      {text}
    </button>
  );
};

export default GrayedOutBtn;
