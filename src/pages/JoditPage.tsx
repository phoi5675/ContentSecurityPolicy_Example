import { Jodit } from "jodit";
import { useEffect, useState } from "react";
import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

export const JoditCspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'none'"]),
  "style-src": new Set<string>(["'none'"]),
};

const JoditPage = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const hasJoditInstance = document.getElementsByClassName("jodit-container");
    if (hasJoditInstance.length) {
      return;
    }
    // Jodit의 타입만 가져오고, 실제 Jodit 스크립트 및 스타일은 public/index.html에서 설정한 cdn에서 가져옴.
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const editor = Jodit.make("#editor");
    setVisible(true);

    return () => {
      editor.destruct();
    };
  }, []);

  return <>{visible && <textarea id="editor" name="editor"></textarea>}</>;
};

export default JoditPage;
