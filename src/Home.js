import React, { Component } from "react";
import { Link } from "@reach/router";
import { List, Header, Loader, Grid, Tab, Label } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";
import { Changelog } from "./Changelog";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      lastAgeThreads: [],
      newThreadsList: [],
      latestNews: [],
      isLoaded: false,
      autoRefresh: null
    };
    this.lastTime = 0;
    this.refreshCooldown = 15;
    this.cooldownCounter = 0;
    this.lastTimeNoAge = 0;
    let homeSound = JSON.parse(localStorage.getItem("settings")).homeSound;
    this.notificationSound = new Audio(
      `https://bienvenidoainternet.org/static/sfx/${homeSound}.ogg`
    );
    this.handeMouseMove = this.handeMouseMove.bind(this);
    this.mouseVars = {};
  }

  componentDidMount() {
    fetch("https://bienvenidoainternet.org/cgi/api/lastage?limit=10")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.lastTime = resource.time;
        this.lastTimeNoAge = resource.time;
        this.setState({
          lastAgeThreads: resource["threads"],
          autoRefresh: setInterval(() => this.updateAges(), 1000)
        });
      });

    fetch("https://bienvenidoainternet.org/cgi/api/newThreads?limit=10")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.setState({
          newThreadsList: resource["threads"]
        });
      });

    fetch("https://bienvenidoainternet.org/cgi/api/blotter")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.setState({
          latestNews: resource["news"],
          isLoaded: true
        });
      });
    window.scrollTo(0, 0);
    window.addEventListener("mousemove", this.handeMouseMove);
  }

  handeMouseMove(e) {
    if (this.state.isLoaded) {
      let traX = (4 * e.pageX) / 480;
      let traY = (4 * e.pageY) / 250;
      document.getElementById("baiLogo").style.backgroundPosition =
        traX + "%" + traY + "%";
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.autoRefresh);
    window.removeEventListener("mousemove", this.handeMouseMove);
  }

  async updateAges() {
    if (!JSON.parse(localStorage.getItem("settings")).autoUpdateThreads) {
      return;
    }
    this.cooldownCounter++;
    if (this.cooldownCounter < this.refreshCooldown) {
      return;
    } else {
      this.cooldownCounter = 0;
    }

    let apiURl = `https://bienvenidoainternet.org/cgi/api/lastage?time=${this.lastTime}&limit=10`;
    fetch(apiURl)
      .then(response => {
        return response.json();
      })
      .then(resource => {
        if (resource.state === "success") {
          if (resource.threads.length > 0) {
            this.setState({
              lastAgeThreads: resource.threads
            });
            this.refreshCooldown = 30;
            if (JSON.parse(localStorage.getItem("settings")).notifyOnHome) {
              this.notificationSound.play();
            }
          } else {
            this.refreshCooldown += 15;
            this.lastTimeNoAge = resource.time;
            if (this.refreshCooldown > 60) {
              this.refreshCooldown = 60;
            }
          }
        }
        this.lastTime = resource.time;
      });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <Loader active centered="true">
          Cargando ...
        </Loader>
      );
    }

    const { newThreadsList, lastAgeThreads, latestNews } = this.state;
    const { nightMode, boardList } = this.props;
    document.title = "B.a.I Home";

    let tabs = [
      {
        menuItem: "Boards",
        render: () => (
          <Tab.Pane
            inverted={nightMode}
            style={{ textAlign: "center" }}
            className="customTab"
          >
            <List horizontal celled link inverted={nightMode} centered>
              {boardList.map(
                (board, i) =>
                  board.board_type === 1 && (
                    <List.Item key={i} inverted={nightMode}>
                      <Link to={`/board/${board.dir}`}>{board.name}</Link>
                    </List.Item>
                  )
              )}
            </List>
            <List horizontal celled link inverted={nightMode}>
              {boardList.map(
                (board, i) =>
                  board.board_type === 0 && (
                    <List.Item key={i}>
                      <Link to={`/board/${board.dir}`}>{board.name}</Link>
                    </List.Item>
                  )
              )}
            </List>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Blotter",
        render: () => (
          <Tab.Pane inverted={nightMode} className="customTab">
            <List divided inverted={nightMode}>
              {latestNews.map(
                (n, i) =>
                  i < 6 && (
                    <List.Item key={n.timestamp}>
                      <List.Content>
                        <div dangerouslySetInnerHTML={{ __html: n.message }} />
                        <small>
                          <Moment fromNow unix locale="es" date={n.timestamp} />
                        </small>
                      </List.Content>
                    </List.Item>
                  )
              )}
            </List>
          </Tab.Pane>
        )
      },
      {
        menuItem: "Changelog",
        render: () => (
          <Tab.Pane inverted={nightMode} className="customTab">
            <List inverted={nightMode}>
              <List.Item>
                <Moment fromNow unix date={Changelog[0].timestamp} />
                <List.List>
                  {Changelog[0].list.map((c, e) => (
                    <List.Item key={e}>
                      <List.Icon name={c.icon} />
                      <List.Content>{c.desc}</List.Content>
                    </List.Item>
                  ))}
                </List.List>
              </List.Item>
            </List>
            <Link to="/changelog">Ver cambios antiguos ...</Link>
          </Tab.Pane>
        )
      }
    ];

    return (
      <React.Fragment>
        <Grid
          columns={2}
          divided
          container
          doubling
          className={nightMode ? "homeContainer inverted" : "homeContainer"}
        >
          <Grid.Row centered columns={1}>
            <Grid.Column textAlign="center">
              <div id="baiLogo" className={nightMode ? "invLogo" : "whiLogo"}>
                BaI
              </div>
              <p>
                Resistiendo desde el 2010
                <br />
                <small>Ahora con 95% extra javascript!</small>
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Tab
                panes={tabs}
                menu={{
                  inverted: nightMode,
                  attached: false,
                  tabular: false,
                  secondary: true,
                  pointing: true
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h4" inverted={nightMode}>
                Hilos activos
              </Header>
              <List divided inverted={nightMode}>
                {lastAgeThreads.map(thread => (
                  <List.Item key={thread.id}>
                    <List.Content floated="right">
                      <Label size="mini" color={nightMode ? "grey" : ""}>{thread.length}</Label>
                    </List.Content>
                    <List.Icon
                      name={
                        thread.bumped > this.lastTimeNoAge
                          ? "bullhorn"
                          : "comment alternate outline"
                      }
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header
                        as={Link}
                        to={`${thread.dir}/read/${thread.id}`}
                        className="postMessage"
                      >
                        {thread.content}
                      </List.Header>
                      <List.Description>
                        {"Hace "}
                        <Moment
                          fromNow
                          unix
                          locale="es"
                          date={thread.bumped}
                        />{" "}
                        en {thread.board_fulln}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column>
              <Header as="h4" inverted={nightMode}>
                Nuevos hilos
              </Header>
              <List divided inverted={nightMode}>
                {newThreadsList.map(thread => (
                  <List.Item key={thread.id}>
                    <List.Icon
                      name="comment alternate outline"
                      size="large"
                      verticalAlign="middle"
                    />
                    <List.Content>
                      <List.Header
                        as={Link}
                        to={`${thread.dir}/read/${thread.id}`}
                      >
                        {thread.content}
                      </List.Header>
                      <List.Description>
                        {"Hace "}
                        <Moment
                          fromNow
                          unix
                          locale="es"
                          ago
                          date={thread.timestamp}
                        />{" "}
                        en {thread.board_fulln}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;
