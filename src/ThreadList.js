import React, { Component } from "react";
import { Loader, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import "moment/locale/es";

class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, threadList: [] };
  }

  componentDidMount() {
    const { dir } = this.props;
    fetch(
      `https://bienvenidoainternet.org/cgi/api/list?dir=${dir}&replies=0&limit=30&nohtml=1`
    )
      .then(response => {
        return response.json();
      })
      .then(resource => {
        this.setState({ threadList: resource.threads, isLoading: false });
      });
  }

  render() {
    const { dir, boardList, nightMode } = this.props;
    const { threadList, isLoading } = this.state;

    const currentBoard = boardList.find(board => {
      return board.dir === dir;
    });

    if (isLoading) {
      return (
        <Loader active centered="true">
          Cargando lista de hilos ...
        </Loader>
      );
    }

    const stripHtml = RegExp(
      /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/g
    );

    return (
      <Segment inverted={nightMode}>
        <Item.Group divided>
          {threadList.map((thread, index) => {
            return (
              <Item key={index} className={nightMode ? "inverted" : ""}>
                {currentBoard.allow_images === 1 && thread.thumb !== "" && (
                  <Item.Image
                    size="tiny"
                    src={`https://bienvenidoainternet.org/${dir}/thumb/${thread.thumb}`}
                  />
                )}
                <Item.Content verticalAlign="middle">
                  <Item.Header
                    as={Link}
                    to={`/${dir}/read/${thread.id}`}
                    className={
                      nightMode ? "threadTitle inverted" : "threadTitle"
                    }
                  >
                    {thread.subject}
                  </Item.Header>
                  <Item.Meta className={nightMode && "inverted"}>
                    <span className="date">
                      <Moment fromNow unix date={thread.timestamp} />
                    </span>
                  </Item.Meta>
                  <Item.Description className={nightMode && "inverted"}>
                    {thread.message.replace(stripHtml, "").substring(0, 200) +
                      " ..."}
                  </Item.Description>
                  <Item.Extra className={nightMode && "inverted"}>
                    <Icon name="reply" />
                    {thread.total_replies} Respuestas
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Segment>
    );
  }
}

export default ThreadList;
