import React, { Component } from "react";
import { List, Header, Segment, Icon, Loader, Grid } from "semantic-ui-react";
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
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch("https://bienvenidoainternet.org/cgi/api/lastage?limit=10")
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.setState({
          lastAgeThreads: resource["threads"]
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
