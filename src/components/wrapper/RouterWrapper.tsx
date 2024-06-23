interface RouterWrapperProps {
  isLoading: boolean;
  children: JSX.Element;
}

const RouterWrapper = ({ isLoading, children }: RouterWrapperProps) => {
  return isLoading ? <div></div> : children;
};
export default RouterWrapper;
