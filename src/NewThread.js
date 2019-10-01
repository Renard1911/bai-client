import React, { Component } from "react";
import {
  Button,
  Form,
  Icon,
  Checkbox,
  Message,
  Modal
} from "semantic-ui-react";
import { quotes } from "./Quotes";

class NewThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      name: "",
      email: "",
      message: "",
      attachment: "",
      selectedFile: null,
      isSpoiler: false,
      submittedName: "",
      submittedEmail: "",
      submittedMessage: "",
      submittedSubject: "",
      replyRes: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    if (name === "hiddenInput") {
      let hiddenInput = document.getElementById("hiddenInput");
      if (hiddenInput.files.length === 0) {
        this.setState({ selectedFile: null });
      } else {
        let file = hiddenInput.files[0].name;
        this.setState({ selectedFile: file });
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  handleClick(e) {
    e.preventDefault();
    document.getElementById("hiddenInput").click();
  }
  handleSubmit() {
    const { name, email, message, subject } = this.state;
    this.setState(
      {
        submittedName: name,
        submittedEmail: email,
        submittedMessage: message,
        submittedSubject: subject,
        replyRes: null
      },
      () => {
        var {
          submittedName,
          submittedEmail,
          submittedMessage,
          submittedSubject,
          selectedFile,
          isSpoiler
        } = this.state;
        const { currentBoard } = this.props;
        let password = JSON.parse(localStorage.getItem("settings"))
          .postPassword;
        let data = {
          board: currentBoard.dir,
          name: "",
          email: "",
          fielda: submittedName,
          fieldb: submittedEmail,
          message: submittedMessage,
          subject: submittedSubject,
          password: password
        };

        if (selectedFile !== null) {
          let file = document.getElementById("hiddenInput").files[0];
          data["file"] = file;
        }

        if (currentBoard.allow_spoilers) {
          data["spoil"] = isSpoiler;
        }

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
              this.setState({
                replyRes: resource,
                message: "",
                selectedFile: null
              });
              let ownPosts = JSON.parse(localStorage.getItem("ownPosts"));
              if (ownPosts === null) {
                ownPosts = {};
              }
              // eslint-disable-next-line no-prototype-builtins
              if (!ownPosts.hasOwnProperty(currentBoard.dir)) {
                ownPosts[currentBoard.dir] = [];
              }
              ownPosts[currentBoard.dir] = ownPosts[currentBoard.dir].concat({
                thread_id: resource.post_id,
                reply_id: resource.post_id
              });
              localStorage.setItem("ownPosts", JSON.stringify(ownPosts));
            } else {
              this.setState({ replyRes: resource });
            }
          });
      }
    );
  }

  render() {
    const { currentBoard, trigger } = this.props;
    const {
      subject,
      name,
      email,
      message,
      attachment,
      selectedFile,
      isSpoiler,
      replyRes
    } = this.state;

    return (
      <Modal trigger={trigger}>
        <Modal.Header>Crear un nuevo hilo en {currentBoard.name}</Modal.Header>
        <Modal.Content>
          {replyRes !== null &&
            (replyRes.state === "success" ? (
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
            ))}

          <Form onSubmit={this.handleSubmit}>
            {currentBoard.disable_subject === 0 && (
              <Form.Input
                id="subject"
                name="subject"
                label="Asunto"
                value={subject}
                onChange={this.handleChange}
              />
            )}
            <Form.Group widths="equal">
              {currentBoard.disable_name === 0 && (
                <Form.Input
                  id="name"
                  name="name"
                  label="Nombre"
                  value={name}
                  onChange={this.handleChange}
                />
              )}
              <Form.Input
                id="email"
                name="email"
                label="E-mail"
                value={email}
                onChange={this.handleChange}
              />
              {currentBoard.allow_image_replies === 1 && (
                <React.Fragment>
                  <input
                    id="hiddenInput"
                    name="hiddenInput"
                    type="file"
                    hidden
                    onChange={this.handleChange}
                    multiple={false}
                  />
                  <Form.Button
                    label="Adjunto"
                    fluid
                    value={attachment}
                    onClick={this.handleClick}
                  >
                    <Icon name="attach" />
                    {selectedFile === null ? "Adjuntar archivo" : selectedFile}
                  </Form.Button>
                </React.Fragment>
              )}
            </Form.Group>
            <Form.TextArea
              name="message"
              value={message}
              label="Mensaje"
              placeholder="(　･ω･) Cuentáme algo interesante ..."
              onChange={this.handleChange}
              rows={7}
            />
            {currentBoard.allow_spoilers === 1 && (
              <Checkbox
                label="El archivo adjunto es un spoiler"
                checked={isSpoiler}
                className="spoilerCheckbox"
              />
            )}
            <Button type="submit">Crear nuevo hilo</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default NewThread;
