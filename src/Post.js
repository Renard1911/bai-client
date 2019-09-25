import React from "react";
import {
  Image,
  Icon,
  Modal,
  Comment,
  Flag,
  Embed,
  Form,
  Button
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

const Post = ({ index, post, locked, threadId, currentBoard, nightMode }) => {
  const filesize = require("filesize");

  // Manejo de posts eliminados
  if (post.IS_DELETED > 0) {
    return (
      <Comment>
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
  const idColor =
    "rgb(" +
    Math.round(idRng() * 255) +
    ", " +
    Math.round(idRng() * 200) +
    ", " +
    Math.round(idRng() * 200) +
    ")";

  let rndAvatar, hue;
  if (user_id !== "") {
    let i = Math.round(idRng() * avatars.length - 1);
    rndAvatar = avatars[i];
    hue = Math.round(idRng() * 360);
  } else {
    let i = Math.round(rng() * avatars.length - 1);
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

  return (
    <Comment inverted={nightMode}>
      <Comment.Avatar
        src={`https://bienvenidoainternet.org/static/ico/${rndAvatar}.gif`}
        style={{ filter: `hue-rotate(${hue}deg)` }}
      />
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
            <Icon
              name="star"
              color={user_id === "CAP_USER*" ? "yellow" : "grey"}
            />
            {user_id === "CAP_USER*" ? (
              "Usuario verificado"
            ) : (
              <span style={{ color: idColor }}>{user_id}</span>
            )}
          </div>
        </Comment.Metadata>
        <Comment.Text>
          {post.file !== "" ? (
            <div className="imageContainer">
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
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://bienvenidoainternet.org/${currentBoard.dir}/src/${post.file}`}
              >
                {post.file}
              </a>{" "}
              {post.image_width}x{post.image_height}{" "}
              {filesize(post.file_size, { bits: true })}
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
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default Post;
