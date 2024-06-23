import cspConfig from "../constants/cspConfig";
import {
  ContentSecurityPolicySrcType,
  ContentSecurityPolicyType,
} from "../types/ContentSecurityPolicyType";

interface CspSetterArgs {
  additionalCspConfig: ContentSecurityPolicyType;
}

const cspSetter = ({ additionalCspConfig }: CspSetterArgs): string => {
  console.log(`[CspSetter] additionalCspConfig = `, additionalCspConfig);
  const _csp = Object.assign({}, cspConfig);

  // 추가 설정 값이 있는 경우, 기존 설정 값에 추가 설정 값을 append
  // 값 중복을 막기 위해 Set 사용
  if (additionalCspConfig) {
    for (const [key, value] of Object.entries(_csp)) {
      if (key in additionalCspConfig) {
        const _key = key as ContentSecurityPolicySrcType;
        let merged;

        // none이 포함되어 있는 경우에는, 기존 설정을 덮어씌움
        if (additionalCspConfig[_key]?.has(`'none'`)) {
          merged = new Set([...Array.from(additionalCspConfig[_key] || [])]);
        } else {
          merged = new Set([
            ...Array.from(value),
            ...Array.from(additionalCspConfig[_key] || []),
          ]);
        }
        _csp[_key] = merged;
      }
    }
  }

  // 병합한 CSP 정책을 content attribute에 넣기 위해 string으로 변환
  let cspContent = "";
  for (const [key, value] of Object.entries(_csp)) {
    cspContent += `${key} ${Array.from(value).join(" ")}; `;
  }

  console.log(`[CspSetter] result of cspContent = ${cspContent}`);
  console.log("csp loaded");

  return cspContent;
};

export default cspSetter;
