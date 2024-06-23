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
  isUnsafeHashesEnabled: boolean;
}

export type SwitchCspDictType = {
  isHttpsEnabled: ContentSecurityPolicyType;
  isUnsafeInlineEnabled: ContentSecurityPolicyType;
  isunsafeHashesEnabled: ContentSecurityPolicyType;
};

export const switchCspDict: SwitchCspDictType = {
  isHttpsEnabled: { "default-src": new Set<string>(["https:"]) },
  isUnsafeInlineEnabled: {
    "style-src": new Set<string>(["'unsafe-inline'"]),
  },
  isunsafeHashesEnabled: {
    "default-src": new Set<string>(["'unsafe-hashes'"]),
  },
};

export interface SwitchCspProps {
  state: SwitchCspState;
  setState: Dispatch<SetStateAction<SwitchCspState>>;
}

const SwitchCsp = ({ state, setState }: SwitchCspProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
              checked={state.isUnsafeHashesEnabled}
              onChange={handleChange}
              name="isUnsafeHashesEnabled"
            />
          }
          label="'unsafe-hashes'"
        />
        {/* TOOD: Jodit 관련 스위치 추가 */}
      </FormGroup>
    </FormControl>
  );
};

export default SwitchCsp;
