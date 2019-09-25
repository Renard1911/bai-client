import React, { Component } from "react";
import {
  Header,
  Icon,
  Loader,
  Message,
  Comment,
  Breadcrumb,
  Divider,
  Container
} from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";
import Post from "./Post";
import ReplyForm from "./ReplyForm";
import { Link } from "@reach/router";

class Thread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      thread: [],
      error: null,
      autoRefresh: null
    };
    this.lastTime = 0;
    this.refreshCooldown = 15;
    this.cooldownCounter = 0;
  }

  componentDidMount() {
    let apiURl;
    if (this.props.id > 1000000) {
      apiURl = `https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&ts=${this.props.id}`;
    } else {
      apiURl = `https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&id=${this.props.id}`;
    }

    fetch(apiURl)
      .then(response => {
        return response.json();
      })
      .then(resource => {
        if (resource["state"] === "error") {
          this.setState({ error: resource });
        }
        this.setState({
          isLoading: false,
          thread: resource,
          autoRefresh: setInterval(() => this.updateReplies(), 1000)
        });
        this.lastTime = resource.time;
      });
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    clearInterval(this.state.autoRefresh);
  }

  async updateReplies() {
    this.cooldownCounter++;
    if (this.cooldownCounter < this.refreshCooldown) {
      return;
    } else {
      this.cooldownCounter = 0;
    }

    let apiURl = `https://bienvenidoainternet.org/cgi/api/thread?dir=${
      this.props.dir
    }&${this.props.id > 1000000 ? "ts" : "id"}=${this.props.id}&offset=${
      this.state.thread.posts.length
    }&time=${this.lastTime}`;

    fetch(apiURl)
      .then(response => {
        return response.json();
      })
      .then(resource => {
        if (resource.state === "success") {
          if (resource.posts.length > 0) {
            const newPosts = this.state.thread.posts.concat(resource.posts);
            this.setState(({ thread }) => ({
              thread: {
                ...thread,
                posts: newPosts
              }
            }));
            this.refreshCooldown = 15;
          } else {
            this.refreshCooldown += 15;
            if (this.refreshCooldown > 60) {
              this.refreshCooldown = 60;
            }
          }
        }
        this.lastTime = resource.time;
      });
  }

  render() {
    const { isLoading, error } = this.state;
    const { boardList, dir, nightMode } = this.props;

    if (isLoading) {
      return (
        <Loader active centered="true">
          Cargando ...
        </Loader>
      );
    }

    if (error != null) {
      return (
        <div>
          <Message negative>
            <Message.Header>API Status: {error.state}</Message.Header>
            <p>{error.message}</p>
          </Message>
        </div>
      );
    }

    const {
      posts,
      subject,
      timestamp,
      total_replies,
      locked,
      id
    } = this.state.thread;

    const currentBoard = boardList.find(board => {
      return board.dir === dir;
    });
    document.title = subject + " - " + currentBoard.name + "@B.a.I";

    return (
      <Container className={nightMode ? "thread inverted" : "thread"}>
        <Breadcrumb className={nightMode ? "inverted" : ""}>
          <Breadcrumb.Section link as={Link} to="/">
            Home
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link as={Link} to={`/board/${currentBoard.dir}`}>
            {currentBoard.name}
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right arrow" />
          <Breadcrumb.Section active>{subject}</Breadcrumb.Section>
        </Breadcrumb>
        <Header as="h1" inverted={nightMode}>
          <Header.Content className="postMessage">
            {subject}
            {locked ? <Icon name="lock" /> : null}
          </Header.Content>

          <Header.Subheader>
            Creado <Moment fromNow unix locale="es" date={timestamp} />
            <br />
            {total_replies} respuestas
            <br />
          </Header.Subheader>
        </Header>
        <Divider />

        <Comment.Group className={nightMode ? "inverted" : ""}>
          {posts.map((post, index) => (
            <Post
              key={index}
              index={index}
              post={post}
              locked={locked}
              currentBoard={currentBoard}
              threadId={id}
            />
          ))}
        </Comment.Group>

        <ReplyForm
          currentBoard={currentBoard}
          parent={id}
          locked={locked}
          nightMode={nightMode}
        />

        <a
          href={`https://bienvenidoainternet.org/cgi/api/thread?dir=${dir}&id=${this.props.id}`}
        >
          API Link
        </a>
      </Container>
    );
  }
}

export default Thread;
