import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import { ChangeEvent, Dispatch } from "react";
import { ContentSecurityPolicyType } from "../types/ContentSecurityPolicyType";

export interface SwitchCspState {
  [key: string]: boolean;
  isHttpsEnabled: boolean;
  isUnsafeInlineEnabled: boolean;
}

export type SwitchCspDictType = {
  isHttpsEnabled: ContentSecurityPolicyType;
  isUnsafeInlineEnabled: ContentSecurityPolicyType;
};

export const SwitchCspDict: SwitchCspDictType = {
  isHttpsEnabled: { "default-src": new Set<string>(["https:"]) },
  isUnsafeInlineEnabled: {
    "style-src": new Set<string>(["'unsafe-inline'"]),
  },
};

interface SwitchCspProps {
  state: SwitchCspState;
  setState: Dispatch<SwitchCspState>;
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
          label="Enable https"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.isUnsafeInlineEnabled}
              onChange={handleChange}
              name="isUnsafeInlineEnabled"
            />
          }
          label="Enable 'unsafe-inline'"
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchCsp;
