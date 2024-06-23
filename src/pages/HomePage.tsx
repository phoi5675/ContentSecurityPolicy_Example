import { useEffect, useState } from "react";

export const HomePage = () => {
  const [home, setHome] = useState<string>("");
  useEffect(() => {
    console.log("Home loaded");
    setHome("hello, home");
  }, []);
  return (
    <>
      <h1>Home</h1>
      <p>{home}</p>
    </>
  );
};

export default HomePage;
