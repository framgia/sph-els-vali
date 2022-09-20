const HeaderSection = ({ current, all, title }) => {
  return (
    <header className="flex justify-between text-[2rem] border-b-2 px-10 py-3">
      <h2 className="font-medium">{title}</h2>
      <p>{`${current}/${all}`}</p>
    </header>
  );
};

export default HeaderSection;
