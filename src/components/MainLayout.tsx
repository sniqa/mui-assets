interface MainLayoutProps {
  leftSide: JSX.Element;
  content: JSX.Element;
}

const MainLayout = ({ leftSide, content }: MainLayoutProps) => {
  return (
    <div className="w-screen h-screen flex">
      <aside className="box-border">{leftSide}</aside>

      <main className="flex-grow box-border bg-gray-200 w-0">{content}</main>
    </div>
  );
};

export default MainLayout;
