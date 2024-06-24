import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

export interface SwitchCspState {
  [key: string]: boolean;
  isHttpsEnabled: boolean;
  isUnsafeInlineEnabled: boolean;
  isShaEnabled: boolean;
}

export type SwitchCspDictType = {
  isHttpsEnabled: ContentSecurityPolicyType;
  isUnsafeInlineEnabled: ContentSecurityPolicyType;
  isShaEnabled: ContentSecurityPolicyType;
};

export const switchCspDict: SwitchCspDictType = {
  isHttpsEnabled: {
    "default-src": new Set<string>(["https:"]),
    "script-src": new Set<string>(["https:"]),
  },
  isUnsafeInlineEnabled: {
    "default-src": new Set<string>(["'unsafe-inline'"]),
    "script-src": new Set<string>(["'unsafe-inline'"]),
    "style-src": new Set<string>(["'unsafe-inline'"]),
  },
  isShaEnabled: {
    "style-src": new Set<string>([
      // emotion-sheet 관련
      "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
      "'sha256-nTv64G8UKVIXOpC06eRf6TiN+zisoNMOIi+f3CUJP/A='",
      // Jodit의 ace.js
      "'sha256-YFgOmo7VipSi3oatfh7T6/2jM+vA82qvEQlE67ZoqJo='",
      "'sha256-Dn0vMZLidJplZ4cSlBMg/F5aa7Vol9dBMHzBF4fGEtk='",
      "'sha256-sA0hymKbXmMTpnYi15KmDw4u6uRdLXqHyoYIaORFtjU='",
      "'sha256-SOw7oHAkZ+mL7wpFKflteSS9kCLcv/jH92ibCU8Qtdk='",
    ]),
  },
};

export interface SwitchCspProps {
  state: SwitchCspState;
  setState: Dispatch<SetStateAction<SwitchCspState>>;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  onChangeHandler: (event?: any, state?: SwitchCspState) => void;
}

const SwitchCsp = ({ state, setState, onChangeHandler }: SwitchCspProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    onChangeHandler(undefined, {
      ...state,
      [event.target.name]: event.target.checked,
    });
    window.location.reload();
  };
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">CSP 정책 토글</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={state.isHttpsEnabled}
              onChange={handleChange}
              name="isHttpsEnabled"
            />
          }
          label="https"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.isUnsafeInlineEnabled}
              onChange={handleChange}
              name="isUnsafeInlineEnabled"
            />
          }
          label="'unsafe-inline'"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.isShaEnabled}
              onChange={handleChange}
              name="isShaEnabled"
            />
          }
          label="enable hash"
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchCsp;
