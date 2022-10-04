const MainSection = ({ item }) => {
  return (
    <div className=" border-b-2 border-dotted p-2">
      <h3 className="text-[1.3rem] font-medium border-b-2">{item.name}</h3>
      <div className="flex space-x-5 justify-between">
        <div>
          <h4 className="text-[1.1rem] font-medium">Word</h4>
          {item.words
            .filter((word) => word !== null)
            .map(({ word }, i) => (
              <p key={i}>{word}</p>
            ))}
        </div>
        <div>
          <h4 className="text-[1.1rem] font-medium">Answer</h4>
          {item.words
            .filter((word) => word !== null)
            .map(({ answer }, i) => (
              <p key={i}>{answer}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
