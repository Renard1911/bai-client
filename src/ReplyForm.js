import React, { Component } from "react";
import { Form, Segment, Button, Message } from "semantic-ui-react";

class ReplyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            message: "",
            submittedName: "",
            submittedEmail: "",
            submittedMessage: "",
            replyRes: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit() {
        const { submittedName, submittedEmail, name, email, message } = this.state
        this.setState({ submittedName: name, submittedEmail: email, submittedMessage: message })
        const data = {
            board: this.props.dir,
            parent: this.props.parent,
            name: "",
            email: "",
            fielda: submittedName,
            fieldb: submittedEmail,
            message: message,
            password: "bai-client"
        }

        const formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }

        fetch("https://bienvenidoainternet.org/cgi/api/post", {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            body: formData
        }
        ).then((response) => {
            return response.json()
        }).then((resource) => {
            console.log(resource);
            this.setState({ replyRes: resource });
        }
        );
    }

    render() {
        const { name, email, message, replyRes } = this.state;
        const quotes = ["Eres una buena persona.", "Y por invertir en felaciones.", "Fue un mensaje cachilupi.", "holiwi :3", "Hemos enviado a tu casa un ejército de prostitutas.", "Fue un mensaje de PURA CALIDAD.", "Ganaste frot gratis por una semana.", "Te besaría en la boca.", "Te invitaría a un café.", "ミト━━━━━━⊂( ﾟ ヮﾟ)⊃━━━━━━ン!!!!!", "Suenas como un bot muy desarrollado.", "¿Usaste TheSaurus para escribir tu post?", "(´･ω･`)", "Plataformas del futuro para la web 1.0.", "Gracias por utilizar Internet.", "Plataformas del pasado para la web 2.0.", "Elegiste bien. Elegiste calidad.", "Espero que no hayas abusado del sage.", "gRAciAs pOR Tu PAgA ;)", "Gracias por tu papiro."]
        return (
            <Segment>
                {
                    replyRes !== null ?
                        replyRes.state === "success" ?
                            (<Message positive>
                                <Message.Header>Gracias por tu post</Message.Header>
                                {quotes[Math.floor(Math.random() * quotes.length)]}<br />
                                <span className="ui small text">Nos tomó {replyRes.time_taken} segundos procesar tu mensaje.</span>
                            </Message>) :
                            (
                                <Message negative>
                                    <Message.Header>{replyRes.state}</Message.Header>
                                    {replyRes.message}
                                </Message>
                            ) : null
                }
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Input label="Nombre" name="name" fluid placeholder="Nombre (Opcional)" value={name} onChange={this.handleChange} />
                        <Form.Input label="E-mail" name="email" fluid placeholder="E-mail (Opcional)" value={email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.TextArea name="message" value={message} label="Mensaje" placeholder="(　･ω･) Cuentáme algo interesante ..." onChange={this.handleChange} />
                    <Button type="submit" secondary>Enviar</Button>
                </Form>
            </Segment >
        );
    }

}

export default ReplyForm;