import React, { Component } from "react";
import { Dropdown, Checkbox, Modal, Header, Input } from "semantic-ui-react";

const notificationSounds = [
  { key: "bed", value: "bed", text: "Bed squeak" },
  { key: "bongchime", value: "bongchime", text: "Bongchime" },
  { key: "boombang", value: "boombang", text: "Boom bang!" },
  { key: "chime", value: "chime", text: "Chime" },
  { key: "cuack", value: "cuack", text: "Cuack" },
  { key: "dootdoot", value: "dootdoot", text: "Mr Skeltal - Doot doot" },
  { key: "iqc", value: "iqc", text: "Notificación IQC" },
  { key: "msn", value: "msn", text: "Notificación MSN" },
  { key: "manscream", value: "manscream", text: "Man Scream (Loud)" },
  {
    key: "messageforme",
    value: "messageforme",
    text: "IT Crowd - Message for me!"
  },
  { key: "nootnoot", value: "nootnoot", text: "Pengu - noot noot" },
  { key: "ohwahahahahah", value: "ohwahahahahah", text: "Oh wah ah ah ah!" },
  { key: "pincheputita", value: "pincheputita", text: "Pinche putita" },
  { key: "idk", value: "idk", text: "??? Pájaro" },
  { key: "whoa", value: "whoa", text: "Woow" }
];

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeSound: "msn",
      threadSound: "dootdoot",
      nightMode: true,
      notifyOnHome: true,
      notifyOnThread: true,
      autoUpdateThreads: true,
      showAvatars: true,
      postPassword: "",
      embedYoutube: true,
      colorifyIDs: true,
      browserId: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleSetting = this.toggleSetting.bind(this);
  }

  componentDidMount() {
    let settings = JSON.parse(localStorage.getItem("settings"));
    this.setState({
      homeSound: settings.homeSound,
      threadSound: settings.threadSound,
      nightMode: settings.nightMode,
      notifyOnHome: settings.notifyOnHome,
      notifyOnThread: settings.notifyOnThread,
      autoUpdateThreads: settings.autoUpdateThreads,
      showAvatars: settings.showAvatars,
      postPassword: settings.postPassword,
      embedYoutube: settings.embedYoutube,
      colorifyIDs: settings.colorifyIDs,
      browserId: settings.browserId
    });
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value }, () => {
      new Audio(
        `https://bienvenidoainternet.org/static/sfx/${
          name === "threadSound" ? this.state.threadSound : this.state.homeSound
        }.ogg`
      ).play();
      this.saveSettings();
    });
  }

  toggleSetting(e, { name, checked }) {
    this.setState({ [name]: checked }, () => {
      this.props.handler(this.state.nightMode);
      this.saveSettings();
    });
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.state));
  }

  render() {
    const {
      homeSound,
      threadSound,
      nightMode,
      autoUpdateThreads,
      notifyOnHome,
      notifyOnThread,
      postPassword,
      showAvatars,
      embedYoutube,
      colorifyIDs,
      browserId
    } = this.state;
    return (
      <Modal trigger={this.props.trigger} size="tiny" centered={false}>
        <Modal.Header>Configuración</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header as="h4" dividing>
              Apariencia
            </Header>
            <Checkbox
              label="Modo nocturno"
              checked={nightMode}
              name="nightMode"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <Checkbox
              label="Mostrar avatares"
              checked={showAvatars}
              name="showAvatars"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <Checkbox
              label="Colorear ID's de Posts"
              checked={colorifyIDs}
              name="colorifyIDs"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <Checkbox
              label="Interpretar navegador de posts"
              checked={browserId}
              name="browserId"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <Header as="h4" dividing>
              Comportamiento
            </Header>
            <Checkbox
              label="Incrustar videos de Youtube"
              checked={embedYoutube}
              name="embedYoutube"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <Checkbox
              label="Actualizar automáticamente hilos"
              checked={autoUpdateThreads}
              name="autoUpdateThreads"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <Checkbox
              label="Notificar cuando existan nuevas respuestas"
              checked={notifyOnHome}
              name="notifyOnHome"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />
            <div className="select">
              Sonido de notificación:{" "}
              <Dropdown
                inline
                select
                scrolling
                options={notificationSounds}
                value={homeSound}
                onChange={this.handleChange}
                name="homeSound"
              />
            </div>
            <Checkbox
              label="Notificar cuando un hilo reciba nuevas respuestas"
              checked={notifyOnThread}
              name="notifyOnThread"
              onChange={this.toggleSetting}
              className="settingCheckbox"
            />

            <div className="select">
              Sonido de notificación :{" "}
              <Dropdown
                inline
                select
                scrolling
                options={notificationSounds}
                value={threadSound}
                onChange={this.handleChange}
                name="threadSound"
              />
            </div>
            <Header as="h4" dividing>
              Posteo
            </Header>
            <Input label="Contraseña" value={postPassword} type="password" />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default SettingsModal;
