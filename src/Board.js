import React, { Component } from "react";
import {
  Loader,
  Message,
  Segment,
  Header,
  Image,
  Comment,
  Divider,
  Breadcrumb
} from "semantic-ui-react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import "moment/locale/es";
import Post from "./Post";
class Board extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      threadList: [],
      error: null
    };
  }

  componentDidMount() {
    fetch(
      `https://bienvenidoainternet.org/cgi/api/list?dir=${this.props.dir}&replies=5&limit=10`
    )
      .then(response => {
        return response.json();
      })
      .then(resource => {
        if (resource["state"] === "error") {
          this.setState({ error: resource });
        }
        this.setState({ isLoaded: true, threadList: resource["threads"] });
      });
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    // Uso tipico (no olvides de comparar los props):
    if (this.props.dir !== prevProps.dir) {
      this.setState({
        isLoaded: false,
        threadList: [],
        error: null
      });
      this.componentDidMount();
    }
  }

  render() {
    const { isLoaded, error, threadList } = this.state;

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

    if (!isLoaded) {
      return (
        <Loader active centered="true">
          Cargando ...
        </Loader>
      );
    }

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
          <Breadcrumb.Section link>{currentBoard.name}</Breadcrumb.Section>
        </Breadcrumb>
        {threadList.map(thread => (
          <Segment.Group key={thread.id}>
            <Header as="h4" attached>
              <Link to={`/${this.props.dir}/read/${thread.id}`}>
                {thread.subject}
              </Link>
            </Header>
            <Segment>
              <Comment.Group>
                <Post
                  index={0}
                  post={thread}
                  locked={thread.locked}
                  threadId={thread.id}
                  dir={this.props.dir}
                />
                <Divider />
                {thread.replies.map((reply, index, replies) => (
                  <Post
                    index={thread.total_replies - replies.length + index + 1}
                    post={reply}
                    locked={thread.locked}
                    threadId={thread.id}
                    dir={this.props.dir}
                    key={index}
                  />
                ))}
              </Comment.Group>
            </Segment>
          </Segment.Group>
        ))}
      </React.Fragment>
    );
  }
}

export default Board;
