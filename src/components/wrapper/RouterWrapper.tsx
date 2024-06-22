import { MutableRefObject, useEffect } from "react";
import { useLocation } from "react-router-dom";
import cspConfig from "../../constants/cspConfig";
import cspSetter from "../../utils/CspSetter";

interface RouterWrapperProps {
  cspMetaTagRef: MutableRefObject<HTMLMetaElement | null>;
  children: JSX.Element;
}

const RouterWrapper = ({ cspMetaTagRef, children }: RouterWrapperProps) => {
  const location = useLocation();
  const page = location.pathname.substring(1) || "Home";

  // Component unmount 하는 경우에 기본 config 값으로 rollback 한다.
  useEffect(() => {
    if (cspMetaTagRef.current === null) {
      console.log(`[Router wrapper][${page}] meta tag ref is null.`);
      return;
    }
    console.log(`[Router wrapper][${page}] unmounted`);
    cspSetter({
      additionalCspConfig: cspConfig,
      cspMetaTagRef,
    });
  });

  return children;
};
export default RouterWrapper;
