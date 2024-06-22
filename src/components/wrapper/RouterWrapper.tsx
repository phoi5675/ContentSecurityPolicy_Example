import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import cspConfig from "../../constants/cspConfig";
import { ContentSecurityPolicyType } from "../../utils/ContentSecurityPolicy/ContentSecurityPolicyType";

interface RouterWrapperProps {
  children: ReactNode;
  additionalConfig: ContentSecurityPolicyType | undefined;
  setAdditionalConfig: Dispatch<
    SetStateAction<ContentSecurityPolicyType | undefined>
  >;
}
const RouterWrapper = (
  { children, additionalConfig, setAdditionalConfig }: RouterWrapperProps,
  props: { page: string }
) => {
  const { page } = props;
  useCallback(() => {
    console.log(
      `[Router wrapper][${page}] additional config = `,
      additionalConfig
    );
    setAdditionalConfig(additionalConfig);
  }, [additionalConfig]);

  // Component unmount 하는 경우에 기본 config 값으로 rollback 한다.
  useEffect(() => {
    setAdditionalConfig(cspConfig);
  });

  return children;
};

export default RouterWrapper;
