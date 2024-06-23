import { useEffect, useRef } from "react";

const InlineStylePage = () => {
  const inlineStylePageDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inlineStylePageDivRef.current = document.getElementById(
      "inline-style-page-div"
    ) as HTMLDivElement;
    // react의 inline-style은 csp의 영향을 받지 않음.
    // setAttribute로 직접 element를 조작해서 csp 설정되도록 변경
    if (inlineStylePageDivRef.current) {
      inlineStylePageDivRef.current.innerHTML = `
      <div style="background-color: red;">
        <h1>Inline style page</h1>
        <p>Inline style page with background color</p>
      </div>
      `;
    }
    console.log(`[Inline-style] page loaded`);

    const elem = document.getElementById("Content-Security-Policy");
    if (elem) {
      console.log(`[Inline-style] policy = `, elem.getAttribute("content"));
    }
  }, []);
  return (
    <>
      <div id="inline-style-page-div"></div>
    </>
  );
};

export default InlineStylePage;
