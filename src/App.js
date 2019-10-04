import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import "fomantic-ui-css/semantic.min.css";
import "./App.css";
import wtfpl from "./wtfpl.png";

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
import ThreadList from "./ThreadList";
import FAQ from "./FAQ";
import ChangeLogPage from "./ChangelogPage";
import SettingsModal from "./Settings";
import NewThread from "./NewThread";

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardList: [],
      isLoaded: false,
      nightMode: false
    };
    this.updateTheme = this.updateTheme.bind(this);
  }

  componentDidMount() {
    fetch("https://bienvenidoainternet.org/cgi/api/boardsExtra")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        let polka = {
          allow_image_replies: 1,
          allow_images: 1,
          board_type: 1,
          dir: "polka",
          maxsize: 500,
          name: "Testing field",
          postarea_desc: "",
          disable_name: 0,
          disable_subject: 0,
          allow_spoilers: 0
        };
        if (localStorage.getItem("thereisnourflevel") === null) {
          polka = {};
        }
        this.setState({
          boardList: resource["boards"].concat(polka),
          isLoaded: true
        });
      });

    let lsSettings = localStorage.getItem("settings");
    let settings = JSON.parse(lsSettings);
    const defaultSettings = {
      homeSound: "msn",
      threadSound: "msn",
      nightMode: false,
      notifyOnHome: true,
      notifyOnThread: true,
      autoUpdateThreads: true,
      showAvatars: true,
      postPassword: this.genPassword(),
      embedYoutube: true
    };
    if (lsSettings === null) {
      localStorage.setItem("settings", JSON.stringify(defaultSettings));
      settings = defaultSettings;
    } else {
      Object.keys(defaultSettings).forEach(key => {
        if (settings[key] === undefined) {
          settings[key] = defaultSettings[key];
        }
      });
      localStorage.setItem("settings", JSON.stringify(defaultSettings));
      this.setState({ nightMode: settings.nightMode });
    }
  }

  updateTheme(mode) {
    this.setState({ nightMode: mode });
  }

  genPassword() {
    let pass = "";
    for (let i = 0; i < 10; i++) {
      let x = Math.round(Math.random() * 2);
      switch (x) {
        case 0:
          pass += String.fromCharCode(48 + Math.round(Math.random() * 9));
          break;
        case 1:
          pass += String.fromCharCode(65 + Math.round(Math.random() * 25));
          break;
        case 2:
          pass += String.fromCharCode(97 + Math.round(Math.random() * 25));
          break;
      }
    }
    return pass;
  }

  componentDidUpdate() {
    if (this.state.nightMode) {
      document.body.style.backgroundColor = "#313233";
    } else {
      document.body.style.backgroundColor = "#FFFFFF";
    }
  }

  render() {
    const { boardList, nightMode, isLoaded } = this.state;

    if (!isLoaded) {
      return (
        <Loader active centered="true">
          Cargando ...
        </Loader>
      );
    }

    return (
      <React.Fragment>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item header>B.a.I</Menu.Item>
            <Menu.Item as={Link} to="/">
              <Icon name="home" /> Home
            </Menu.Item>
            <Dropdown text="Boards" className="link item">
              <Dropdown.Menu>
                <Dropdown.Header>Bolletin Board System</Dropdown.Header>
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
                <Dropdown.Header>Imageboard</Dropdown.Header>
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
            <Menu.Item as={Link} to="/faq">
              <Icon name="help" /> FAQ
            </Menu.Item>
            <Menu.Menu position="right">
              <SettingsModal
                trigger={
                  <Menu.Item as="a">
                    <Icon name="configure" />
                  </Menu.Item>
                }
                handler={this.updateTheme}
              />
            </Menu.Menu>
          </Container>
        </Menu>
        <Container className="main">
          <Router>
            <Home boardList={boardList} path="/" nightMode={nightMode} />
            <Thread
              boardList={boardList}
              path="/:dir/read/:id"
              nightMode={nightMode}
            >
              <Thread path=":active" />
            </Thread>
            <Board
              boardList={boardList}
              path="/board/:dir"
              nightMode={nightMode}
            />
            <ThreadList
              boardList={boardList}
              path="/list/:dir"
              nightMode={nightMode}
            />
            <ChangeLogPage path="/changelog" nightMode={nightMode} />
            <FAQ path="/faq" nightMode={nightMode} />
            <NewThread
              path="/new/:dir"
              boardList={boardList}
              nightMode={nightMode}
            />
            <NotFound default />
          </Router>
        </Container>
        <Segment
          vertical
          textAlign="center"
          className={nightMode ? "footer night" : "footer"}
        >
          Bievenido a Internet 2010-2019
          <br />
          <Icon name="github" />
          <a href="https://github.com/Renard1911/bai-client">bai-client</a>
          {" + "}
          <a href="https://git.bienvenidoainternet.org/bai/weabot/">weabot</a>
          <br />
          <a href="http://www.wtfpl.net/about/">
            <img src={wtfpl} alt="Do what the fuck you want" />
          </a>
        </Segment>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
