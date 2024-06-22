import { Helmet } from "react-helmet-async";

const CspHeaderWrapper = () => {
  return (
    <Helmet>
      <meta
        httpEquiv="Content-Security-Policy"
        id="Content-Security-Policy"
        content=""
      />
    </Helmet>
  );
};
export default CspHeaderWrapper;
