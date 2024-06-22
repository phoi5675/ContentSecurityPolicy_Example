import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
} from "@mui/material";
import { ChangeEvent, Dispatch } from "react";

export interface SwitchCspState {
  isHttpsEnabled: boolean;
  isNonceEnabled: boolean;
}

interface SwitchCspProps {
  state: SwitchCspState;
  setState: Dispatch<SwitchCspState>;
}

const SwitchCsp = ({ state, setState }: SwitchCspProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(`${event.target.name} : ${event.target.checked}`);
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
          label="Enable HTTPS"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.isNonceEnabled}
              onChange={handleChange}
              name="isNonceEnabled"
            />
          }
          label="Enable Nonce"
        />
      </FormGroup>
    </FormControl>
  );
};

export default SwitchCsp;
