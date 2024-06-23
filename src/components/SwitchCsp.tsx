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
}

export type SwitchCspDictType = {
  isHttpsEnabled: ContentSecurityPolicyType;
  isUnsafeInlineEnabled: ContentSecurityPolicyType;
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
      </FormGroup>
    </FormControl>
  );
};

export default SwitchCsp;
