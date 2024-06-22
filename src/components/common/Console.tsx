import { useEffect, useState } from "react";

// TODO: 필요하면 나중에 다시 제작하기
const Console = () => {
  const [logs, setLog] = useState<string[]>([]);
  const [errors, setError] = useState<string[]>([]);

  useEffect(() => {
    // backup original logger
    const originalConsole = { ...console };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    console.log = (message?: any, ...optionalParams: any[]): void => {
      const _msg =
        typeof message === "string"
          ? message
          : JSON.stringify(message, null, 2);
      setLog((log) => [...log, _msg]);
      originalConsole.log(message, optionalParams);
    };
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
    console.error = (message?: any, ...optionalParams: any[]): void => {
      const _msg =
        typeof message === "string"
          ? message
          : JSON.stringify(message, null, 2);
      setError((error) => [...error, _msg]);
      originalConsole.error(message, optionalParams);
    };
    return () => {
      // restore original logger
      console = originalConsole;
    };
  }, [logs, errors]);
  return (
    <div>
      <h1>Console</h1>
      <div>
        <h2>Logs</h2>
        <div>
          {logs.map((log) => {
            return <p>{log}</p>;
          })}
        </div>
      </div>
      <div>
        <h2>errors</h2>
        <div>
          {errors.map((error) => {
            return <p>{error}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Console;
