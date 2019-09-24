import React, { Component } from "react";
import { Header, Loader, List, Card, Image, Icon } from "semantic-ui-react";
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
    const { dir, boardList } = this.props;
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
      <Card.Group centered itemsPerRow={4} stackable>
        {threadList.map((thread, index) => {
          return (
            <Card key={index} raised>
              {currentBoard.allow_images === 1 ? (
                <Image
                  src={`https://bienvenidoainternet.org/${dir}/thumb/${thread.thumb}`}
                  ui={false}
                  style={{ maxHeight: "250px" }}
                />
              ) : null}
              <Card.Content>
                <Card.Header as={Link} to={`/${dir}/read/${thread.id}`}>
                  {thread.subject}
                </Card.Header>
                <Card.Meta>
                  <span className="date">
                    <Moment fromNow unix date={thread.timestamp} />
                  </span>
                </Card.Meta>
                <Card.Description>
                  {thread.message.replace(stripHtml, "").substring(0, 200) +
                    " ..."}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="reply" />
                {thread.total_replies} Respuestas
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    );
  }
}

export default ThreadList;
