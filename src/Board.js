import React, { Component } from "react";
import { Loader } from "semantic-ui-react";

class Board extends Component {
    constructor() {
        super();
        this.state = {
            isLoaded: false,
            threadList: []
        }
    }

    componentDidMount() {
        // fecth boardlist
    }

    render() {
        const { isLoaded, threadList } = this.state;

        if (!isLoaded) {
            return (
                <Loader active centered >
                    Cargando ...
                </Loader>
            )
        } else {
            return "yay";
        }
    }
}

export default Board;