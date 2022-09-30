import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const HeaderSection = ({ current, all, title }) => {
  const { user } = useAuthContext();
  return (
    <header className="flex flex-col justify-between border-b px-10 py-3">
      <div className="flex justify-between border-b-2 p-2 items-center">
        <Link
          to="/categories"
          className="btn_white flex justify-evenly shadow-md"
        >
          <ArrowLeftIcon className="w-6" />
          Back
        </Link>
        <Link
          to={`/learnings/${user.id}`}
          className="btn_white shadow-md w-fit flex justify-evenly"
        >
          <DocumentTextIcon className="w-6" /> Learnings
        </Link>
      </div>
      <div className="flex justify-between text-[2rem]">
        <h2 className="font-medium">{title}</h2>
        <p>{`${current}/${all}`}</p>
      </div>
    </header>
  );
};

export default HeaderSection;
