import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface RouterWrapperProps {
  children: JSX.Element;
}

// TODO: 인터페이스 및 코드 수정
const RouterWrapper = ({ children }: RouterWrapperProps) => {
  const location = useLocation();
  const page = location.pathname.substring(1) || "Home";

  // Component unmount 하는 경우에 기본 config 값으로 rollback 한다.
  useEffect(() => {
    console.log(`[Router wrapper][${page}] unmounted`);
  });

  return children;
};
export default RouterWrapper;
