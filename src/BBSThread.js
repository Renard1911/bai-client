import React, { Component } from "react";
import { Header, Icon, Loader, Message, Segment } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";

class BBSThread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            thread: [],
            error: null
        }
    }

    componentDidMount() {

        let apiURl;
        if (this.props.id > 1000000) {
            apiURl = `https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&ts=${this.props.id}`;
        } else {
            apiURl = `https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&id=${this.props.id}`;
        }
        console.log(apiURl);
        fetch(apiURl)
            .then((response) => { return response.json() })
            .then((resource => {
                if (resource["state"] == "error") {
                    console.log("API Error:" + resource["message"]);
                    this.setState({ error: resource });
                }
                this.setState({ isLoading: false, thread: resource });
            }))
            .catch(console.error);
    }
    render() {
        const { isLoading, error } = this.state;

        if (isLoading) {
            return (
                <Loader active centered="true">
                    Cargando ...
                </Loader >
            )
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

        const { posts, subject, timestamp, total_replies } = this.state.thread;

        return (
            <div>
                <Header as="h2">{subject}
                    <Header.Subheader>
                        <Icon name="clock" /> <Moment fromNow unix locale="es" date={timestamp} />
                        &nbsp;<Icon name="reply" /> {total_replies}
                    </Header.Subheader>
                </Header>

                {posts.map(post =>
                    post.IS_DELETED === 0 ?
                        (<Segment.Group>
                            <Header as="h5" attached>
                                {post.name}
                                <Header.Subheader>
                                    <Moment fromNow unix locale="es" date={post.timestamp} />
                                </Header.Subheader>
                            </Header>
                            <Segment attached>
                                <div dangerouslySetInnerHTML={{ __html: post.message }} />
                            </Segment>
                            <Segment attached='bottom' textAlign='right' tertiary style={{ "padding": "0.5em", "font-size": "0.75em" }}>
                                <Icon name="reply" /> Responder ― &nbsp;
                                <Icon name="exclamation circle" /> Reportar
                            </Segment>
                        </Segment.Group>
                        ) : null)
                }

                <a href={`https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&id=${this.props.id}`}>API Link</a>
            </div>);
    }
}

export default BBSThread;