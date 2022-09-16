export const RenderIf = ({ children, condition, otherwise }) => {
  return <>{condition ? children : otherwise}</>;
};
