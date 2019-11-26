import React from "react";
import { useParams } from "react-router-dom";
import { Header, Button, Icon, Segment } from "semantic-ui-react";

import Token from "../helpers/token";

const defaultReturnUrl = "teacher";

const parseToken = ({ token, return_url = defaultReturnUrl }, history) => {
  if (token) {
    Token.set(token);
    history.push("/" + return_url);
  }
};

const Login = ({ history, location }) => {
  parseToken(useParams(), history);

  let facebookLoginHref = "//localhost:8000/api/login";
  const return_url =
    typeof location.state !== "undefined" && location.state.return_url;

  if (return_url) {
    facebookLoginHref += `?return_url=${return_url}`;
  }

  return (
    <Segment
      size="big"
      raised
      textAlign="center"
      style={{ marginTop: "6rem", marginBottom: "6rem" }}
    >
      <Header size="large" icon>
        <Icon color="orange" name="users" circular />
        Начните работу с нами!
      </Header>
      <p>
        Залогиньтесь с помощью кнопки ниже, добавьте информацию о себе и о вас
        узнают студенты
      </p>
      <div style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <a href={facebookLoginHref}>
          <Button size="massive" color="facebook">
            <Icon name="facebook" /> Facebook
          </Button>
        </a>
      </div>
    </Segment>
  );
};

export default Login;
