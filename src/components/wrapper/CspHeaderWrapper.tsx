import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { getCookie } from "../../utils/cookieUtil";

const CspHeaderWrapper = () => {
  const cspMetaRef = useRef<HTMLMetaElement | null>(null);

  useEffect(() => {
    const cookieCspContent = getCookie("cspContent") as string | null;

    cspMetaRef.current = document.getElementById(
      "Content-Security-Policy"
    ) as HTMLMetaElement;

    cspMetaRef.current.setAttribute("content", cookieCspContent || "");

    console.log(`[CspHeader] csp loaded`);
  }, []);

  return (
    <Helmet>
      <meta httpEquiv="Content-Security-Policy" id="Content-Security-Policy" />
    </Helmet>
  );
};

export default CspHeaderWrapper;
