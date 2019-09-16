import React, { Component } from "react";
import {
  Header,
  Icon,
  Loader,
  Message,
  Comment,
  Breadcrumb
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
      error: null
    };
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
        this.setState({ isLoading: false, thread: resource });
      });
    /* .catch(console.error); */
  }
  render() {
    const { isLoading, error } = this.state;

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
    document.title = subject;

    const currentBoard = this.props.boardList.find(board => {
      return board.dir === this.props.dir;
    });

    return (
      <React.Fragment>
        <Breadcrumb>
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
        <Header as="h2">
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

        <Comment.Group>
          {posts.map((post, index) => (
            <Post
              key={index}
              index={index}
              post={post}
              locked={locked}
              dir={this.props.dir}
              threadId={id}
            />
          ))}
        </Comment.Group>

        <ReplyForm dir={this.props.dir} parent={id} />

        <a
          href={`https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&id=${this.props.id}`}
        >
          API Link
        </a>
      </React.Fragment>
    );
  }
}

export default Thread;
