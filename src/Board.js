import React, { Component } from "react";
import { Loader, Message, Segment, Header, Icon, Image } from "semantic-ui-react";
import { Link } from "@reach/router";
import Moment from "react-moment";
import "moment/locale/es";
class Board extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            threadList: [],
            error: null
        }
    }

    componentDidMount() {
        fetch(`https://bienvenidoainternet.org/cgi/api/list?dir=${this.props.dir}&replies=5&limit=10`)
            .then((response) => {
                return response.json();
            })
            .then((resource) => {
                if (resource["state"] == "error") {
                    this.setState({ error: resource });
                }
                this.setState({ isLoaded: true, threadList: resource["threads"] })
            })
            .catch(console.error)
    }

    componentWillUnmount() {
        console.log("will unmount")
    }

    componentDidUpdate(prevProps) {
        // Uso tipico (no olvides de comparar los props):
        if (this.props.dir !== prevProps.dir) {
            this.setState({
                isLoaded: false,
                threadList: [],
                error: null
            })
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
                <Loader active centered="true" >
                    Cargando ...
                </Loader >
            )
        }

        return (
            <div>
                {threadList.map(thread =>
                    <Segment.Group>
                        <Header as="h4" attached>
                            <Link to={`/${this.props.dir}/read/${thread.id}`}>{thread.subject}</Link>
                            <Header.Subheader>
                                {thread.name} ― <Moment fromNow unix locale="es" date={thread.timestamp} />
                            </Header.Subheader>
                        </Header>
                        <Segment attached>
                            <div dangerouslySetInnerHTML={{ __html: thread.message }} />
                        </Segment>
                        {thread.replies.map(reply =>
                            <Segment.Group horizontal key={reply.id}>
                                {reply.file != "" ? <Segment compact> <Image src={`https://bienvenidoainternet.org/${this.props.dir}/thumb/${reply.thumb}`} /></Segment> : null}
                                <Segment>
                                    <div className="postMessage" dangerouslySetInnerHTML={{ __html: reply.message }} />
                                    <Icon name="reply" />Responder
                                   <Icon name="exclamation circle" />Reportar
                               </Segment>
                            </Segment.Group>
                        )}

                    </Segment.Group>
                )}
            </div>
        );
    }
}

export default Board;