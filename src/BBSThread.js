import React, { Component } from "react";
import { Header, Icon, Loader, Message, Segment } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";
import Post from "./Post";
import ReplyForm from "./ReplyForm";

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
                if (resource["state"] === "error") {
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

        const { posts, subject, timestamp, total_replies, locked, id } = this.state.thread;

        return (
            <div>
                <Header as="h2">
                    <Header.Content className="postMessage">
                        {subject}{locked ? <Icon name='lock' /> : null}
                    </Header.Content>

                    <Header.Subheader>

                        Creado <Moment fromNow unix locale="es" date={timestamp} /><br />
                        {total_replies} respuestas<br />

                    </Header.Subheader>
                </Header>

                {posts.map((post, index) =>
                    post.IS_DELETED === 0 ?
                        (<Post key={index} index={index} post={post} locked={locked} dir={this.props.dir} />) :
                        (<Segment secondary>
                            #{index} Eliminado <Moment fromNow unix locale="es" date={post.timestamp} />
                        </Segment>)
                )
                }

                <ReplyForm dir={this.props.dir} parent={id} />

                <a href={`https://bienvenidoainternet.org/cgi/api/thread?dir=${this.props.dir}&id=${this.props.id}`}>API Link</a>
            </div>);
    }
}

export default BBSThread;