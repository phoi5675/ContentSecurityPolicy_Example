import hljs from "highlight.js";
import { FormEvent, useState } from "react";

const XssPage = () => {
  const [content, setContent] = useState<string>("Hello, Xss!");
  const [xssData, setXssData] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setXssData(content);
  };

  const xssCode = `
  <img 
    src="x"
    onerror="alert('xss attaaaaaaaaaack!!!')">
  </img>
  `;
  const highlightedCode = hljs.highlight(xssCode, { language: "xml" }).value;

  return (
    <>
      <h1>XSS</h1>
      <form method="post" onSubmit={handleSubmit}>
        <p>Type some text!</p>
        <label>
          <textarea
            name="xssTextArea"
            rows={4}
            cols={50}
            defaultValue={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div id="xss-target" dangerouslySetInnerHTML={{ __html: xssData }}></div>
      <pre>
        <code
          className="language-html"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        ></code>
      </pre>
    </>
  );
};

export default XssPage;
