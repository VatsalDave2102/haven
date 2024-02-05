import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return <div className="w-full max-w-7xl mx-auto px-4">{children}</div>;
};

export default Container;
