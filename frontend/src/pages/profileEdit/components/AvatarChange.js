import { useEffect, useRef, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const AvatarChange = ({ data, setImage }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const imageRef = useRef();

  const defaultImage = `${process.env.REACT_APP_BACKEND_URL}/images/default-icon.webp`;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (result) => {
      setSelectedImage(result.target.result);
    };
  };

  const handleImageDelete = () => {
    setSelectedImage(defaultImage);
    setImage(defaultImage);
  };

  useEffect(() => {
    setSelectedImage(data?.avatar_url);
    setImage(data?.avatar_url);
  }, [data]);
  return (
    <div className="inline bg-white p-8 px-12 rounded-xl shadow-md min-w-fit space-y-6 text-center select-none">
      <h1 className="font-bold text-[2rem] select-text">{`${data?.first_name} ${data?.last_name}`}</h1>
      <div className="relative w-fit mx-auto">
        <TrashIcon
          className={`sm:w-6 lg:w-8 absolute sm:right-0 lg:right-6 top-2 bg-slate-200 rounded-full p-1  ${
            selectedImage === defaultImage
              ? "cursor-not-allowed text-gray-500"
              : "cursor-pointer hover:text-red-600 trans"
          }`}
          onClick={handleImageDelete}
        />
        <img
          className="sm:w-[6rem] rounded-full lg:w-[12rem] sm:h-[6rem] lg:h-[12rem] object-cover object-center"
          src={selectedImage}
          alt="icon"
        />
      </div>
      <input onChange={handleImageChange} ref={imageRef} type="file" hidden />
      <button
        className="p-2 bg-orange-600 rounded-md text-white transition transform ease-out duration-150 hover:bg-orange-500 active:bg-orange-400 active:scale-90"
        onClick={() => imageRef.current.click()}
      >
        Upload New Photo
      </button>
    </div>
  );
};

export default AvatarChange;
