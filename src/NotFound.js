import React from "react";
import { Header, Icon } from "semantic-ui-react";

const NotFound = () => {
  return (
    <div style={{ "margin-top": "50px" }}>
      <Header as="h1" icon textAlign="center">
        <Icon name="bug" />
        404
        <Header.Subheader>Recurso no encontrado</Header.Subheader>
      </Header>
    </div>
  );
};

export default NotFound;
