import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import "fomantic-ui-css/semantic.css";
import "./App.css";

import { Dropdown, Menu, Icon, Loader, Container } from "semantic-ui-react";
import Home from "./Home";
import Thread from "./Thread";
import Board from "./Board";
import NotFound from "./NotFound";

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardList: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://bienvenidoainternet.org/cgi/api/boards")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.setState({ boardList: resource["boards"], isLoaded: true });
      })
      .catch(console.error);
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
          </Container>
        </Menu>
        <Container className="main">
          <Router>
            <Home boardList={this.state.boardList} path="/" />
            <Thread path="/:dir/read/:id">
              <Thread path=":active" />
            </Thread>
            <Board path="/board/:dir" />
            <NotFound default />
          </Router>
        </Container>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
