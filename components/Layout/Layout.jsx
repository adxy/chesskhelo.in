import { Component } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import Footer from "./Footer";

const DynamicHeader = dynamic(() => import("./Header"), {
  ssr: false,
});

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1em 0;
`;

class Layout extends Component {
  render() {
    return (
      <div>
        <DynamicHeader />
        <LayoutContainer>{this.props.children}</LayoutContainer>
        <Footer />
      </div>
    );
  }
}

export default Layout;
