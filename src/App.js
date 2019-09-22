import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import "fomantic-ui-css/semantic.css";
import "./App.css";

import {
  Dropdown,
  Menu,
  Icon,
  Loader,
  Container,
  Segment
} from "semantic-ui-react";
import Home from "./Home";
import Thread from "./Thread";
import Board from "./Board";
import NotFound from "./NotFound";

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardList: [],
      isLoaded: false,
      nightMode: true
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  componentDidMount() {
    fetch("https://bienvenidoainternet.org/cgi/api/boards")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.setState({ boardList: resource["boards"], isLoaded: true });
      });
  }

  componentDidUpdate() {
    if (this.state.nightMode) {
      document.body.style.backgroundColor = "#313233";
    } else {
      document.body.style.backgroundColor = "#FFFFFF";
    }
  }

  toggleTheme() {
    this.setState({ nightMode: !this.state.nightMode });
  }

  render() {
    if (!this.state.isLoaded) {
      if (!this.state.isLoaded) {
        return (
          <Loader active centered="true">
            Cargando ...
          </Loader>
        );
      }
    }

    const { boardList } = this.state;
    //const pathList = boardList.map(board => "/" + board.dir)
    return (
      <React.Fragment>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header>B.a.I</Menu.Item>
            <Menu.Item as={Link} to="/">
              <Icon name="home" /> Home
            </Menu.Item>
            <Dropdown text="BBS" className="link item">
              <Dropdown.Menu>
                {boardList.map(board =>
                  board.board_type === 1 ? (
                    <Dropdown.Item
                      key={board.dir}
                      as={Link}
                      to={`/board/${board.dir}`}
                    >
                      /{board.dir}/ - {board.name}
                    </Dropdown.Item>
                  ) : null
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown text="Imageboard" className="link item">
              <Dropdown.Menu>
                {boardList.map(board =>
                  board.board_type === 0 ? (
                    <Dropdown.Item
                      key={board.dir}
                      as={Link}
                      to={`/board/${board.dir}`}
                    >
                      /{board.dir}/ - {board.name}
                    </Dropdown.Item>
                  ) : null
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Menu position="right">
              <Menu.Item as="a" onClick={this.toggleTheme}>
                {this.state.nightMode ? (
                  <Icon name="sun" />
                ) : (
                  <Icon name="moon" />
                )}
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        <Container className="main">
          <Router>
            <Home
              boardList={this.state.boardList}
              path="/"
              nightMode={this.state.nightMode}
            />
            <Thread
              boardList={this.state.boardList}
              path="/:dir/read/:id"
              nightMode={this.state.nightMode}
            >
              <Thread path=":active" />
            </Thread>
            <Board
              boardList={this.state.boardList}
              path="/board/:dir"
              nightMode={this.state.nightMode}
            />
            <NotFound default />
          </Router>
        </Container>
        <Segment vertical textAlign="center" className="footer">
          Bievenido a Internet 2010-2019
          <br />
          <Icon name="github" />
          <a href="https://github.com/Renard1911/bai-client">bai-client</a>
          {" + "}
          <a href="https://git.bienvenidoainternet.org/bai/weabot/">weabot</a>
        </Segment>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
