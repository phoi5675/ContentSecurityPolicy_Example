import { Jodit } from "jodit";
import { useEffect } from "react";
import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

declare global {
  interface Window {
    Jodit: typeof Jodit;
  }
}

export const JoditCspConfig: ContentSecurityPolicyType = {
  "default-src": new Set<string>(["'none'"]),
  "style-src": new Set<string>(["'none'"]),
};

const JoditPage = () => {
  useEffect(() => {
    try {
      const hasJoditInstance =
        document.getElementsByClassName("jodit-container");
      if (hasJoditInstance.length) {
        return;
      }

      // Jodit의 타입만 가져오고, 실제 Jodit 스크립트 및 스타일은 public/index.html에서 설정한 cdn에서 가져옴.
      const editor = window.Jodit.make("#editor", {
        // NOTE: jodit에서 sourceEditor를 ace로 설정하면 CDN 주소 문제로 인해 index.html에서 가져오는 스크립트가 실행되지 않음.
        // sourceEditor: "ace",
      });

      return () => {
        editor.destruct();
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <textarea id="editor" name="editor"></textarea>
    </div>
  );
};

export default JoditPage;
