interface HeaderBoxProps {
  title: string;
  subtext: string;
  type?: string;
  user?: User | null;
}

const HeaderBox = ({ type, title, user = null, subtext }: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title">
        {title}
        {type === "greeting" && (
          <span className="text-sky-500">&nbsp;{user?.firstName}</span>
        )}
      </h1>
      <p className="header-box-subtext">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
