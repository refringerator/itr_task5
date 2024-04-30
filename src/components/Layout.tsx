import React from "react";
import { Layout as AntdLayout } from "antd";

const { Header, Content } = AntdLayout;

const headerStyle: React.CSSProperties = {
  textAlign: "end",
  height: 48,
  lineHeight: "48px",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  width: "100%",
};

interface ILayout {
  header: React.ReactNode;
}

const Layout = ({ children, header }: React.PropsWithChildren<ILayout>) => {
  return (
    <AntdLayout style={{ width: "100%", backgroundColor: "inherit" }}>
      <Header style={headerStyle}>{header}</Header>
      <Content style={{ padding: "8px 48px" }}>{children}</Content>
    </AntdLayout>
  );
};

export default Layout;
