import React, { Component } from "react";
import { List, Header, Segment, Icon, Loader } from "semantic-ui-react";
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
        }
    }

    componentDidMount() {
        fetch("https://bienvenidoainternet.org/cgi/api/lastage?limit=10")
            .then((response) => { return response.json() })
            .then((resource) => {
                this.setState({
                    lastAgeThreads: resource["threads"]
                })
            });

        fetch("https://bienvenidoainternet.org/cgi/api/newThreads?limit=10")
            .then((response) => { return response.json() })
            .then((resource) => {
                this.setState({
                    newThreadsList: resource["threads"],
                });
            });

        fetch("https://bienvenidoainternet.org/cgi/api/blotter")
            .then((response) => { return response.json() })
            .then((resource) => {
                this.setState({
                    latestNews: resource["news"],
                    isLoaded: true
                });
            });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Loader active centered="true" >
                    Cargando ...
                </Loader>
            )
        }

        const { newThreadsList, lastAgeThreads, latestNews } = this.state;

        return (
            <Segment.Group>
                <Segment.Group horizontal>

                    <Segment>
                        <Header as="h4">Hilos activos</Header>
                        <List divided>
                            {lastAgeThreads.map(thread =>
                                <List.Item key={thread.id}>
                                    <List.Icon name='comment alternate outline' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as={Link} to={`${thread.dir}/read/${thread.id}`}>{thread.content}</List.Header>
                                        <List.Description as='a'><Icon name="folder open outline" /> {thread.board_fulln} ― <Icon name="clock" /><Moment fromNow unix locale="es" date={thread.last} /></List.Description>
                                    </List.Content>
                                </List.Item>
                            )}
                        </List>
                    </Segment>

                    <Segment>
                        <Header as="h4">Nuevos hilos</Header>
                        <List divided>
                            {newThreadsList.map(thread =>
                                <List.Item key={thread.id}>
                                    <List.Icon name='comment alternate outline' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header as={Link} to={`${thread.dir}/read/${thread.id}`}>{thread.content}</List.Header>
                                        <List.Description as='a'><Icon name="folder open outline" /> {thread.board_fulln} ― <Icon name="clock" /><Moment fromNow unix locale="es" date={thread.timestamp} /></List.Description>
                                    </List.Content>
                                </List.Item>
                            )}
                        </List>
                    </Segment>

                </Segment.Group>
                <Segment>
                    <Header as="h4">Blotter</Header>
                    <List divided>
                        {latestNews.map(n =>
                            <List.Item key={n.timestamp}>
                                <List.Content>
                                    <div dangerouslySetInnerHTML={{ __html: n.message }} />
                                    <span className="ui tiny"><Icon name="clock" /><Moment fromNow unix locale="es" date={n.timestamp} /></span>

                                </List.Content>
                            </List.Item>
                        )}
                    </List>
                </Segment>

            </Segment.Group>
        );
    }
}

export default Home;