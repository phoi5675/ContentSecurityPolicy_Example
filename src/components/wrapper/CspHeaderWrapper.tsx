import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import cspConfig from "../../constants/cspConfig";
import cspSetter from "../../utils/CspSetter";

const CspHeaderWrapper = () => {
  const metaRef = useRef<HTMLMetaElement | null>(null);
  useEffect(() => {
    metaRef.current = document.getElementById(
      "Content-Security-Policy"
    ) as HTMLMetaElement;
    if (!metaRef.current) {
      return;
    }

    cspSetter({
      additionalCspConfig: cspConfig,
      cspMetaTagRef: metaRef,
    });

    return () => {
      metaRef.current?.remove();
    };
  }, []);
  return (
    <Helmet>
      <meta
        httpEquiv="Content-Security-Policy"
        id="Content-Security-Policy"
        content=""
        ref={metaRef}
      />
    </Helmet>
  );
};

export default CspHeaderWrapper;
