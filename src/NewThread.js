import React, { Component } from "react";
import {
  Segment,
  Button,
  Form,
  Icon,
  Checkbox,
  Header
} from "semantic-ui-react";

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
      isSpoiler: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { boardList, dir } = this.props;
    const {
      subject,
      name,
      email,
      message,
      attachment,
      selectedFile,
      isSpoiler
    } = this.state;
    const currentBoard = boardList.find(board => {
      return board.dir === dir;
    });

    return (
      <Segment inverted={this.props.nightMode}>
        <Header as="h2" dividing>
          Crear un nuevo hilo en {currentBoard.name}
        </Header>
        <Form inverted={this.props.nightMode}>
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
      </Segment>
    );
  }
}

export default NewThread;
