import React, { Component } from 'react';
import { render } from "react-dom";
import { Router, Link, Match } from "@reach/router";
import 'fomantic-ui-css/semantic.css';
import "./App.css";

import { Dropdown, Menu, Icon, Loader, Container, Grid } from "semantic-ui-react";
import Home from "./Home";
import BBSThread from "./BBSThread";
import Board from "./Board";
import NotFound from "./NotFound"

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardList: [],
      isLoaded: false
    }

  }

  componentDidMount() {
    fetch("https://bienvenidoainternet.org/cgi/api/boards")
      .then((response) => {
        return response.json();
      })
      .then((resource) => {
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
            </Loader >
        )
      }
    }

    const { boardList } = this.state;
    const pathList = boardList.map(board => "/" + board.dir)
    return (
      <Container>
        <Menu inverted>
          <Menu.Item header>B.a.I</Menu.Item>
          <Menu.Item as={Link} to="/"><Icon name='home' /> Home</Menu.Item>
          <Dropdown text='BBS' className='link item'>
            <Dropdown.Menu>
              {boardList.map(board => board.board_type === 1 ? <Dropdown.Item key={board.dir} as={Link} to={`/board/${board.dir}`}>/{board.dir}/ - {board.name}</Dropdown.Item> : null)}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text='Imageboard' className='link item'>
            <Dropdown.Menu>
              {boardList.map(board => board.board_type === 0 ? <Dropdown.Item key={board.dir} as={Link} to={`/board/${board.dir}`}>/{board.dir}/ - {board.name}</Dropdown.Item> : null)}
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
        <Router>
          <Home boardList={this.state.boardList} path="/" />
          <BBSThread path="/:dir/read/:id">
            <BBSThread path=":active" />
          </BBSThread>
          <Board path="/board/:dir" />
          <NotFound default />
        </Router>
      </Container >
    );
  }
}


render(<App />, document.getElementById("root"));