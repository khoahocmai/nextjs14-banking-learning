const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="header-box bg-green-100 p-4 rounded-lg shadow-md">
      <h1 className="header-box-title text-green-700 font-bold text-2xl">
        {title}
        {type === "greeting" && (
          <span className="text-green-500">&nbsp;{user}</span>
        )}
      </h1>
      <p className="header-box-subtext text-green-600">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
