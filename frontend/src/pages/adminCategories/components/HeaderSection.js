const HeaderSection = () => {
  return (
    <header className="flex justify-between border-b-2 px-10 py-3 items-center">
      <h2 className="font-medium sm:text-[1.2rem] md:text-[2rem]">
        All Categories
      </h2>
      <button className="btn text-[1.2rem] w-fit text-white select-none">
        Add Category
      </button>
    </header>
  );
};

export default HeaderSection;
