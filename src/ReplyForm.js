import React, { Component } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

class ReplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
            submittedName: "",
            submittedEmail: "",
            submittedMessage: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit() {
        const { name, email, message } = this.state
        this.setState({ submittedName: name, submittedEmail: email, submittedMessage: message })
        const formData = {
            board: this.props.dir,
            parent: this.props.parent,
            name: "",
            email: "",
            fielda: name,
            fieldb: email,
            message: message,
            password: "bai-client"
        }
        fetch('https://bienvenidoainternet.org/cgi/api/post', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            mode: "cors",
            redirect: 'follow',
            body: JSON.stringify(formData)
        }
        ).then(response => {
            console.log(response.json);
        });
    }

    render() {
        const { name, email, message } = this.state;
        return (
            <Segment>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Input name="name" fluid placeholder='Nombre (Opcional)' value={name} width={4} onChange={this.handleChange} />
                        <Form.Input name="email" fluid placeholder='E-mail (Opcional)' value={email} width={4} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.TextArea name="message" value={message} label='Mensaje' placeholder='(　･ω･) Cuentáme algo interesante ...' width={8} onChange={this.handleChange} />
                    <Button type='submit' secondary>Enviar</Button>
                </Form>
            </Segment >
        );
    }

}

export default ReplyForm;