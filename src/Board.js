import React, { Component } from "react";
import {
  Loader,
  Message,
  Segment,
  Header,
  Comment,
  Divider,
  Breadcrumb
} from "semantic-ui-react";
import { Link } from "@reach/router";
import Post from "./Post";
class Board extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      threadList: [],
      error: null,
      loadingMore: false,
      endReached: false
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.threadOffset = 10;
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
        this.setState(
          { isLoaded: true, threadList: resource["threads"] },
          () => {
            window.scrollTo(0, 0);
          }
        );
      });
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollHeight - scrollTop === clientHeight &&
      !this.state.loadingMore &&
      !this.state.endReached
    ) {
      this.setState({ loadingMore: true });
      this.fetchMoreThreads();
    }
  }

  fetchMoreThreads() {
    fetch(
      `https://bienvenidoainternet.org/cgi/api/list?dir=${this.props.dir}&replies=5&limit=10&offset=${this.threadOffset}`
    )
      .then(response => {
        return response.json();
      })
      .then(resource => {
        if (resource.state === "success") {
          if (resource.threads.length > 0) {
            const moreThreads = this.state.threadList.concat(resource.threads);
            this.threadOffset += 10;
            this.setState({ threadList: moreThreads, loadingMore: false });
          } else {
            this.setState({ endReached: true, loadingMore: false });
          }
        }
        return;
      });
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
    const { isLoaded, error, threadList, loadingMore, endReached } = this.state;
    const { boardList, dir, nightMode } = this.props;

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

    const currentBoard = boardList.find(board => {
      return board.dir === dir;
    });
    document.title = currentBoard.name + " - B.a.I";

    currentBoard.postarea_desc = currentBoard.postarea_desc.replace(
      'src="/',
      'src="https://bienvenidoainternet.org/'
    );

    return (
      <React.Fragment>
        <Breadcrumb className={nightMode ? "inverted" : ""}>
          <Breadcrumb.Section link as={Link} to="/">
            Home
          </Breadcrumb.Section>
          <Breadcrumb.Divider icon="right chevron" />
          <Breadcrumb.Section link>{currentBoard.name}</Breadcrumb.Section>
        </Breadcrumb>
        <Segment basic inverted={nightMode}>
          <Header as="h1" inverted={nightMode}>
            {currentBoard.name}
            <Header.Subheader>/{currentBoard.dir}/</Header.Subheader>
          </Header>
          <p>
            <div
              dangerouslySetInnerHTML={{ __html: currentBoard.postarea_desc }}
            ></div>
          </p>
          <Link to={`/list/${currentBoard.dir}`}>Lista de hilos</Link>
        </Segment>

        {threadList.map(thread => (
          <Segment.Group key={"seg_" + thread.timestamp + thread.id}>
            <Header
              as="h3"
              attached
              inverted={nightMode}
              className="threadTitle"
            >
              <Link to={`/${dir}/read/${thread.id}`}>{thread.subject}</Link>
              <Header.Subheader>
                {thread.total_replies} respuestas
              </Header.Subheader>
            </Header>
            <Segment attached inverted={nightMode}>
              <Comment.Group className={nightMode ? "inverted" : ""}>
                <Post
                  index={0}
                  post={thread}
                  locked={thread.locked}
                  threadId={thread.id}
                  currentBoard={currentBoard}
                  nightMode={nightMode}
                  totalReplies={thread.total_replies}
                />
                <Divider />
                {thread.replies.map((reply, index, replies) => (
                  <Post
                    index={thread.total_replies - replies.length + index + 1}
                    post={reply}
                    locked={thread.locked}
                    threadId={thread.id}
                    key={"reply_" + reply.id}
                    currentBoard={currentBoard}
                    nightMode={nightMode}
                    totalReplies={thread.total_replies}
                  />
                ))}
              </Comment.Group>
            </Segment>
          </Segment.Group>
        ))}

        {loadingMore ? (
          <Loader active inline="centered" style={{ marginTop: "3em" }}>
            Cargando más hilos ...
          </Loader>
        ) : null}

        {endReached ? (
          <Message
            warning
            header="ｷﾀ━━━(ﾟ∀ﾟ)━━━!!"
            content="No hay más hilos para mostrar."
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Board;
