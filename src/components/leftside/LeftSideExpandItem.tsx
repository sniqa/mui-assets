interface LeftSideExpandItemProps {
  icon: JSX.Element;
  onClick?: () => void;
}

const LeftSideExpandItem = ({ icon, onClick }: LeftSideExpandItemProps) => {
  return (
    <div
      className={`group relative flex justify-center items-center rounded px-2 py-1.5 h-10 border cursor-pointer`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export default LeftSideExpandItem;
