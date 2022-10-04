import { Link, useParams } from "react-router-dom";

import Navbar from "pages/components/Navbar";
import MainSection from "./components/MainSection";
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

import useGetLearntWords from "hooks/useGetLearntWords";
import useGetUser from "hooks/useGetUser";

const Learnings = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUser(id);
  const { data: wordsData, isLoading: wordsLoading } = useGetLearntWords(id);

  return (
    <div className="min-h-[100vh] w-[100%] h-[100%] flex flex-col">
      <Navbar />
      <div className=" flex-grow flex flex-col sm:w-[80%] lg:w-[60%] mx-auto py-8 space-y-1">
        <div className="bg-white p-2 rounded-md shadow-md">
          {data && (
            <header className="border-b-2 p-2">
              <Link
                to={`/users/${id}`}
                className="flex cursor-pointer p-2 trans w-max select-none rounded-md space-x-3 shadow-md"
              >
                <ArrowLeftIcon className="w-6" />
                <p>{`${data?.first_name} ${data?.last_name}`}</p>
              </Link>
            </header>
          )}

          <main className="grid sm:grid-cols-1 lg:grid-cols-2 w-[70%] mx-auto gap-10 p-2">
            {wordsData?.map((d) => (
              <MainSection key={d.id} item={d} />
            ))}
          </main>
          {isLoading || wordsLoading ? (
            <ArrowPathIcon className="w-8 animate-spin mx-auto my-2" />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Learnings;
