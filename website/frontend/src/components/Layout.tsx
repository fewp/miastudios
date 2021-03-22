import React from "react";
import { Header } from "./Header";

interface LayoutProps {
  header?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <>
      {header ? <Header /> : null}
      {children}
    </>
  );
};
