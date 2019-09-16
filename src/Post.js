import React from "react";
import {
  Segment,
  Header,
  Image,
  Label,
  Icon,
  Modal,
  Comment,
  Divider
} from "semantic-ui-react";
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

const Post = ({ index, post, locked, dir, threadId }) => {
  if (post.IS_DELETED > 0) {
    return (
      <Comment>
        <Comment.Avatar
          src={`https://bienvenidoainternet.org/static/css/img/picnicbdy.gif`}
        />
        <Comment.Content>
          <Comment.Author as="a">#{index + 1}</Comment.Author>
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

  return (
    <Comment>
      <Comment.Avatar
        src={`https://bienvenidoainternet.org/static/ico/${rndAvatar}.gif`}
      />
      <Comment.Content>
        <Comment.Author as="a">
          #{index + 1}{" "}
          <span
            className={post.email === "sage" ? "username sage" : "username"}
          >
            {post.name}
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
            {user_id}
          </div>
        </Comment.Metadata>
        <Comment.Text>
          {post.file !== "" ? (
            <div className="imageContainer">
              <ImageModal
                href={`https://bienvenidoainternet.org/${dir}/src/${post.file}`}
                trigger={
                  <Image
                    centered
                    className="postImage"
                    src={`https://bienvenidoainternet.org/${dir}/thumb/${post.thumb}`}
                  />
                }
              />
              {post.file} {post.image_width}x{post.image_height}{" "}
              {filesize(post.file_size, { bits: true })}
            </div>
          ) : null}
          <div
            className={`postMessage ${dir === "zonavip" ? "vipFont" : null}`}
            dangerouslySetInnerHTML={{ __html: post.message }}
          />
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Responder</Comment.Action>
          <Comment.Action>Reportar</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default Post;
