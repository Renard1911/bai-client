import React from "react";
import { Image, Icon, Modal, Comment, Flag } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";
import { avatars } from "./Quotes";

const ImageModal = ({ href, trigger }) => (
  <Modal trigger={trigger} basic size="fullscreen">
    <Modal.Content image>
      <Modal.Description style={{ textAlign: "center" }}>
        <Image as="a" src={href} />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

const Post = ({ index, post, locked, threadId, currentBoard }) => {
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

  const filesize = require("filesize");
  const seedrandom = require("seedrandom");
  const rng = seedrandom(threadId + index);

  let user_id = post.timestamp_formatted.split(" ID:")[1];
  const i = Math.round(rng() * avatars.length);
  const rndAvatar = avatars[i];
  let flag;

  if (currentBoard.dir === "world") {
    flag = post.name.match("[A-Z][A-Z]");
    if (flag !== null) {
      flag = flag[0].toLowerCase();
    } else {
      flag = "kp"; // heh
    }
  }

  post.message = post.message.replace(
    '<img src="/',
    '<img src="https://bienvenidoainternet.org/'
  );

  if (currentBoard.board_type === 0) {
    post.message = post.message.replace("/res/", "/read/");
    post.message = post.message.replace(".html#", "/");
  }

  if (post.tripcode === " (★ ****-****)") {
    post.tripcode = "";
  }

  return (
    <Comment>
      <Comment.Avatar
        src={`https://bienvenidoainternet.org/static/ico/${rndAvatar}.gif`}
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
            {user_id === "CAP_USER*" ? "Usuario verificado" : user_id}
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
              {post.file} {post.image_width}x{post.image_height}{" "}
              {filesize(post.file_size, { bits: true })}
            </div>
          ) : null}
          <div
            className={`postMessage ${
              currentBoard.dir === "zonavip" ? "vipFont" : null
            }`}
            dangerouslySetInnerHTML={{ __html: post.message }}
          />
        </Comment.Text>
        <Comment.Actions>
          {locked ? null : <Comment.Action>Responder</Comment.Action>}
          <Comment.Action>Reportar</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default Post;
