import React, { Component } from "react";
import { List, Header, Icon, Loader, Grid } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";

import { Link } from "@reach/router";

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
  }

  componentWillUnmount() {
    clearInterval(this.state.autoRefresh);
  }

  async updateAges() {
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
    document.title = "B.a.I Home";
    return (
      <Grid columns={2} divided container doubling>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4">Hilos activos</Header>
            <List divided>
              {lastAgeThreads.map(thread => (
                <List.Item key={thread.id}>
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
                    <List.Description as="a">
                      <Icon name="folder open outline" /> {thread.board_fulln} ―{" "}
                      <Icon name="clock" />
                      <Moment fromNow unix locale="es" date={thread.last} />
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as="h4">Nuevos hilos</Header>
            <List divided>
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
                    <List.Description as="a">
                      <Icon name="folder open outline" /> {thread.board_fulln} ―{" "}
                      <Icon name="clock" />
                      <Moment
                        fromNow
                        unix
                        locale="es"
                        date={thread.timestamp}
                      />
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header as="h4">Blotter</Header>
            <List divided>
              {latestNews.map(n => (
                <List.Item key={n.timestamp}>
                  <List.Content>
                    <div dangerouslySetInnerHTML={{ __html: n.message }} />
                    <span className="ui tiny">
                      <Icon name="clock" />
                      <Moment fromNow unix locale="es" date={n.timestamp} />
                    </span>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;
