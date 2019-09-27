import React, { Component } from "react";
import { Form, Segment, Button, Message, Icon } from "semantic-ui-react";
import { quotes } from "./Quotes";

class ReplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message:
        this.props.replyIndex !== undefined
          ? ">>" + this.props.replyIndex + "\n"
          : "",
      attachment: "",
      submittedName: "",
      submittedEmail: "",
      submittedMessage: "",
      replyRes: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (userData != null) {
      this.setState({ name: userData.name, email: userData.email });
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { name, email, message } = this.state;
    this.setState(
      {
        submittedName: name,
        submittedEmail: email,
        submittedMessage: message,
        replyRes: null
      },
      () => {
        const { submittedName, submittedEmail, submittedMessage } = this.state;
        const { currentBoard, parent } = this.props;
        let password = localStorage.getItem("password");
        const data = {
          board: currentBoard.dir,
          parent: parent,
          name: "",
          email: "",
          fielda: submittedName,
          fieldb: submittedEmail,
          message: submittedMessage,
          password: password
        };

        let userData = { name: name, email: email };
        localStorage.setItem("userData", JSON.stringify(userData));

        const formData = new FormData();
        for (var key in data) {
          formData.append(key, data[key]);
        }

        fetch("https://bienvenidoainternet.org/cgi/api/post", {
          method: "POST",
          mode: "cors",
          redirect: "follow",
          body: formData
        })
          .then(response => {
            return response.json();
          })
          .then(resource => {
            if (resource.state === "success") {
              this.randomQuote =
                quotes[Math.floor(Math.random() * quotes.length)];
              this.setState({ replyRes: resource, message: "" });
              let ownPosts = JSON.parse(localStorage.getItem("ownPosts"));
              if (ownPosts === null) {
                ownPosts = {};
              }
              // eslint-disable-next-line no-prototype-builtins
              if (!ownPosts.hasOwnProperty(currentBoard.dir)) {
                ownPosts[currentBoard.dir] = [];
              }
              ownPosts[currentBoard.dir] = ownPosts[currentBoard.dir].concat({
                thread_id: parent,
                reply_id: resource.post_id
              });
              localStorage.setItem("ownPosts", JSON.stringify(ownPosts));
            }
          });
      }
    );
  }

  handleClick(e) {
    e.preventDefault();
    document.getElementById("hiddenInput").click();
  }

  render() {
    const { name, email, message, replyRes, attachment } = this.state;
    const { currentBoard, nightMode, quickReply, locked } = this.props;
    if (locked === 1) {
      return (
        <Message negative>
          <Message.Header>Hilo cerrado</Message.Header>
          Este hilo ha sido cerrado y no admite nuevas respuestas.
        </Message>
      );
    }
    return (
      <Segment inverted={nightMode} basic={quickReply}>
        {replyRes !== null ? (
          replyRes.state === "success" ? (
            <Message positive>
              <Message.Header>Gracias por tu post</Message.Header>
              {this.randomQuote}
              <br />
              <span className="ui small text">
                Nos tomó {replyRes.time_taken} segundos procesar tu mensaje.
              </span>
            </Message>
          ) : (
            <Message negative>
              <Message.Header>{replyRes.state}</Message.Header>
              {replyRes.message}
            </Message>
          )
        ) : null}
        <Form onSubmit={this.handleSubmit} inverted={nightMode}>
          <Form.Group widths="equal">
            <Form.Input
              label="Nombre"
              name="name"
              fluid
              placeholder="Nombre (Opcional)"
              value={name}
              onChange={this.handleChange}
            />
            <Form.Input
              label="E-mail"
              name="email"
              fluid
              placeholder="E-mail (Opcional)"
              value={email}
              onChange={this.handleChange}
            />
            {/* TODO: Archivos adjuntos */}
            {currentBoard.board_type === 0 &&
            currentBoard.allow_image_replies === 1 ? (
              <React.Fragment>
                <input id="hiddenInput" type="file" hidden />
                <Form.Button
                  label="Adjunto"
                  fluid
                  value={attachment}
                  onClick={this.handleClick}
                >
                  <Icon name="attach" />
                  Adjuntar archivo
                </Form.Button>
              </React.Fragment>
            ) : null}
          </Form.Group>
          <Form.TextArea
            name="message"
            value={message}
            label="Mensaje"
            placeholder="(　･ω･) Cuentáme algo interesante ..."
            onChange={this.handleChange}
          />
          <Button type="submit">Enviar</Button>
        </Form>
      </Segment>
    );
  }
}

export default ReplyForm;
