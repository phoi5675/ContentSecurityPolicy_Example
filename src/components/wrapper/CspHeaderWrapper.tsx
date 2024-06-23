import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import cspConfig from "../../constants/cspConfig";
import { ContentSecurityPolicySrcType } from "../../types/ContentSecurityPolicyType";
import cspSetter from "../../utils/CspSetter";
import { SwitchCspState, switchCspDict } from "../SwitchCsp";

interface CspHeaderWrapperProps {
  state: SwitchCspState;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const CspHeaderWrapper = ({
  state,
  isLoading,
  setIsLoading,
}: CspHeaderWrapperProps) => {
  const [cspContent, setCspContent] = useState<string>("");

  useEffect(() => {
    const mergedConfig = Object.assign({}, cspConfig);

    for (const [isEnabled, enabledCspConfig] of Object.entries(switchCspDict)) {
      if (isEnabled in state && state[isEnabled]) {
        for (const [src, policy] of Object.entries(enabledCspConfig)) {
          const _src = src as ContentSecurityPolicySrcType;
          mergedConfig[_src] = new Set<string>([
            ...Array.from(mergedConfig[_src]!),
            ...Array.from(policy),
          ]);
        }
      }
    }

    setCspContent(
      cspSetter({
        additionalCspConfig: mergedConfig,
      })
    );
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Helmet>
      <meta
        httpEquiv="Content-Security-Policy"
        id="Content-Security-Policy"
        content={cspContent}
      />
    </Helmet>
  );
};

export default CspHeaderWrapper;
