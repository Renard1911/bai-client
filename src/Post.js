import React, { Component } from "react";
import {
  Image,
  Icon,
  Modal,
  Comment,
  Flag,
  Embed,
  Form,
  Button,
  Confirm
} from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";
import { avatars } from "./Quotes";
import ReplyForm from "./ReplyForm";

const ImageModal = ({ href, trigger }) => (
  <Modal trigger={trigger} basic size="fullscreen">
    <Modal.Content image>
      <Modal.Description style={{ textAlign: "center" }}>
        <Image as="a" src={href} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

const ReportModal = ({ trigger, threadId, postId, dir }) => (
  <Modal trigger={trigger} size="tiny">
    <Modal.Header>Reportar</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>
          Para pedir que el post <b>#{postId}</b> sea eliminado, indica una
          razón y presiona el botón Reportar.
        </p>
        <p>
          Normalmente eliminamos los mensajes que son considerados spam o flood.
          <br />
          Si deseas pedir la prohibición de acceso a algún usuario persistente,
          te recomendamos hacerlo en la sección /bai/.
        </p>
        <Form>
          <Form.Field>
            <Form.Input label="Razón" />
          </Form.Field>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red">Reportar</Button>
    </Modal.Actions>
  </Modal>
);

const QuickReplyModal = ({ trigger, currentBoard, id, locked, replyIndex }) => (
  <Modal trigger={trigger} size="tiny">
    <Modal.Header>Respuesta rápida</Modal.Header>.
    <Modal.Content className="replyModal">
      <ReplyForm
        currentBoard={currentBoard}
        parent={id}
        locked={locked}
        nightMode={false}
        quickReply
        replyIndex={replyIndex}
      />
    </Modal.Content>
  </Modal>
);

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteDialog: false
    };
    this.showDialog = this.showDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  showDialog() {
    this.setState({ deleteDialog: true });
  }

  handleCancel() {
    this.setState({ deleteDialog: false });
  }

  handleConfirm() {
    this.setState({ deleteDialog: false });
    const { post, currentBoard } = this.props;
    let password = JSON.parse(localStorage.getItem("settings")).postPassword;
    fetch(
      `https://bienvenidoainternet.org/cgi/api/delete?dir=${currentBoard.dir}&id=${post.id}&password=${password}`
    )
      .then(response => {
        return response.json();
      })
      .then(resource => {
        // TODO: Reportar resultado
      });
  }

  render() {
    const {
      index,
      post,
      locked,
      threadId,
      currentBoard,
      nightMode,
      totalReplies
    } = this.props;
    const filesize = require("filesize");

    // Manejo de posts eliminados
    if (post.IS_DELETED > 0) {
      return (
        <Comment inverted={nightMode}>
          <Comment.Avatar
            src={`https://bienvenidoainternet.org/static/css/img/picnicbdy.gif`}
          />
          <Comment.Content>
            <Comment.Author as="a">
              #{currentBoard.board_type === 0 ? post.id : index + 1}
            </Comment.Author>
            <Comment.Metadata>
              <div>
                <Moment fromNow unix locale="es" date={post.timestamp} />
              </div>
            </Comment.Metadata>
            <Comment.Text>
              <span className="deleted">
                Eliminado por el {post.IS_DELETED === 1 ? "usuario." : "Staff."}
              </span>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      );
    }

    // Obtener un avatar aleatorio basado en ID
    let user_id = post.timestamp_formatted.split(" ID:")[1];
    const seedrandom = require("seedrandom");
    const rng = seedrandom(threadId + index);
    const idRng = seedrandom(user_id);
    let idColor =
      "rgb(" +
      Math.round(idRng() * 255) +
      ", " +
      Math.round(idRng() * 200) +
      ", " +
      Math.round(idRng() * 200) +
      ")";

    let rndAvatar, hue;
    if (user_id !== "") {
      let i = Math.round(idRng() * (avatars.length - 1));
      rndAvatar = avatars[i];
      hue = Math.round(idRng() * 360);
    } else {
      let i = Math.round(rng() * (avatars.length - 1));
      rndAvatar = avatars[i];
      hue = Math.round(rng() * 360);
    }

    // Obetener bandera del pais (para /world)
    let flag;
    if (currentBoard.dir === "world") {
      flag = post.name.match("[A-Z][A-Z]");
      if (flag !== null) {
        flag = flag[0].toLowerCase();
      } else {
        flag = "kp"; // heh
      }
    }

    // Fix: imagenes en dominio incorrecto
    post.message = post.message.replace(
      '<img src="/',
      '<img src="https://bienvenidoainternet.org/'
    );

    // Fix para reach-router
    if (currentBoard.board_type === 0) {
      post.message = post.message.replace("/res/", "/read/");
      post.message = post.message.replace(".html#", "/");
    }

    if (post.tripcode === " (★ ****-****)") {
      post.tripcode = "";
    }

    // Obtener lista de videos de youtube incrustados
    const youtubeRe = RegExp(
      /(?:https?:\/\/)?(?:www\.)?youtu(.be\/|be\.com\/watch\?v=)(\w{11})/g
    );
    const youtubeVideos = post.message.match(youtubeRe);

    // El post es nuestro?
    const ownPosts = JSON.parse(localStorage.getItem("ownPosts"));
    let isMine = false;
    if (ownPosts !== null) {
      if (Object.prototype.hasOwnProperty.call(ownPosts, currentBoard.dir)) {
        ownPosts[currentBoard.dir].forEach(reply => {
          if (reply.thread_id === post.parentid) {
            if (reply.reply_id === post.id) {
              isMine = true;
            }
          }
        });
      }
    }

    let starColor = "grey";
    let icon = "user";
    if (user_id === "CAP_USER*") {
      starColor = "blue";
      icon = "check circle";
    } else if (isMine) {
      starColor = "olive";
    } else if (user_id === "???T") {
      icon = "user secret";
    }
    if (post.name === "Renard ★") {
      starColor = "yellow";
      icon = "chess queen";
      user_id = "Bai-Client Dev";
      idColor = "#FBBD08";
    }
    if (post.name === "TOW ★") {
      starColor = "pink";
      icon = "chess queen";
      user_id = "Weabot Dev";
      idColor = "#e03997";
    }
    if (post.name === "Staff ★") {
      user_id = "Staff de BaI";
      idColor = "rgba(255, 255, 255, 0.7);";
    }

    let hasVideo = post.file.endsWith(".webm");
    let hasAudio =
      post.file.endsWith(".mp3") ||
      post.file.endsWith(".opus") ||
      post.file.endsWith(".ogg");
    let isMime =
      post.file.endsWith(".epub") ||
      post.file.endsWith(".mod") ||
      post.file.endsWith(".pdf") ||
      post.file.endsWith(".s3m") ||
      post.file.endsWith(".swf") ||
      post.file.endsWith(".torrent") ||
      post.file.endsWith(".xm");

    let isDeleteable = true;
    // No se pueden eliminar hilos con más de 5 respuestas
    if (index === 0 && totalReplies > 5) {
      isDeleteable = false;
    }
    // No se pueden eliminar hilos/post de /cero/
    if (currentBoard.dir === "0") {
      isDeleteable = false;
    }
    // No se pueden eliminar post con una antiguedad superior a 24 horas
    if (Date.now() / 1000 - post.timestamp > 86400) {
      isDeleteable = false;
    }

    let settingRenderAvatar = JSON.parse(localStorage.getItem("settings"))
      .showAvatars;

    return (
      <Comment inverted={nightMode}>
        {settingRenderAvatar && (
          <Comment.Avatar
            src={`https://bienvenidoainternet.org/static/ico/${rndAvatar}.gif`}
            style={{ filter: `hue-rotate(${hue}deg)` }}
          />
        )}
        <Comment.Content>
          <Comment.Author
            as="a"
            href={post.mail !== "" ? `mailto:${post.email}` : null}
          >
            #{currentBoard.board_type === 0 ? post.id : index + 1}{" "}
            <span
              className={post.email === "sage" ? "username sage" : "username"}
            >
              {currentBoard.dir === "world"
                ? post.name.split("<em>")[0]
                : post.name}{" "}
              {currentBoard.dir === "world" ? <Flag name={flag} /> : null}
            </span>
            <span className="tripcode">{post.tripcode}</span>
          </Comment.Author>
          <Comment.Metadata>
            <div>
              <Moment fromNow unix locale="es" date={post.timestamp} />
            </div>
            <div>
              <Icon name={icon} color={starColor} />
              {user_id === "CAP_USER*" ? (
                "Usuario verificado"
              ) : (
                <span style={{ color: idColor }}>{user_id}</span>
              )}
              {isMine ? " (Tú)" : null}
            </div>
          </Comment.Metadata>
          <Comment.Text>
            {post.file !== "" ? (
              <div className="imageContainer">
                {hasVideo && (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    src={`https://bienvenidoainternet.org/${currentBoard.dir}/src/${post.file}`}
                    controls
                    poster={`https://bienvenidoainternet.org/${currentBoard.dir}/thumb/${post.thumb}`}
                    width="400"
                  />
                )}
                {hasAudio && (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <audio
                    src={`https://bienvenidoainternet.org/${currentBoard.dir}/src/${post.file}`}
                    controls
                  />
                )}
                {!hasVideo && !hasAudio && !isMime && (
                  <ImageModal
                    href={`https://bienvenidoainternet.org/${currentBoard.dir}/src/${post.file}`}
                    trigger={
                      <Image
                        centered
                        className="postImage"
                        src={`https://bienvenidoainternet.org/${currentBoard.dir}/thumb/${post.thumb}`}
                      />
                    }
                  />
                )}
                {isMime && (
                  <Image
                    size="mini"
                    ui={false}
                    src={`https://bienvenidoainternet.org/static/${post.thumb}`}
                  />
                )}

                <div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://bienvenidoainternet.org/${currentBoard.dir}/src/${post.file}`}
                  >
                    {post.file}
                  </a>{" "}
                  {!hasAudio &&
                    !isMime &&
                    `${post.image_width}x${post.image_height}`}{" "}
                  {filesize(post.file_size)}
                </div>
              </div>
            ) : null}

            {youtubeVideos !== null
              ? youtubeVideos.map((url, i) => {
                  let id = url.split("?v=")[1];
                  return (
                    <div className="playerContainer" key={i}>
                      <Embed
                        id={id}
                        source="youtube"
                        key={i}
                        placeholder={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                      />
                    </div>
                  );
                })
              : null}

            <div
              className={`postMessage ${
                currentBoard.dir === "zonavip" ? "vipFont" : null
              }`}
              dangerouslySetInnerHTML={{ __html: post.message }}
            />
          </Comment.Text>
          <Comment.Actions>
            {locked ? null : (
              <QuickReplyModal
                trigger={<Comment.Action>Responder</Comment.Action>}
                currentBoard={currentBoard}
                id={threadId}
                locked={locked}
                replyIndex={currentBoard.board_type === 0 ? post.id : index + 1}
              />
            )}
            <ReportModal
              trigger={<Comment.Action>Reportar</Comment.Action>}
              postId={post.id}
            />
            {isDeleteable && (
              <Comment.Action onClick={this.showDialog}>
                Eliminar
              </Comment.Action>
            )}
          </Comment.Actions>
        </Comment.Content>
        <Confirm
          open={this.state.deleteDialog}
          content="¿Estás seguro de querer eliminar este post?"
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
          confirmButton="Eliminar"
          size="small"
        />
      </Comment>
    );
  }
}

export default Post;
