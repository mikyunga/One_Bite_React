import "./Main.css";

const Main = () => {
  const user = {
    name: "서미경",
    isLogin: true,
  };
  if (user.isLogin) {
    return <div className="logout">로그아웃</div>;
  }
  return (
    <main>
      <h1>main</h1>
    </main>
  );
};

export default Main;
