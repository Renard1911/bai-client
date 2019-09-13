import React from "react";
import { Segment, Header, Image, Label, Icon, Modal } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";

const ImageModal = ({ href, trigger }) => (
    <Modal trigger={trigger}>
        <Modal.Content image>
            <Modal.Description>
                <Image as="a" src={href} fluid />
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

const Post = ({ index, post, locked, dir }) => {
    const filesize = require('filesize');
    let user_id = post.timestamp_formatted.split(" ID:")[1];

    return (
        <Segment.Group>
            <Header as="h5" attached>
                #{index + 1} <span className={post.email === "sage" ? "username sage" : "username"}>{post.name}</span><span className="tripcode">{post.tripcode}</span>

                <Header.Subheader className="inlineSubHeader">
                    <Moment fromNow unix locale="es" date={post.timestamp} />
                </Header.Subheader>
                {user_id ? <Label size="mini">{user_id}</Label> : null}
            </Header>

            <Segment.Group horizontal>
                {post.file !== "" ?
                    <Segment compact className="imageSegment">
                        <Label size="tiny" attached='bottom'>{post.file} {post.image_width}x{post.image_height}
                            <Label.Detail>{filesize(post.file_size, { bits: true })}</Label.Detail>
                        </Label>
                        <ImageModal href={`https://bienvenidoainternet.org/${dir}/src/${post.file}`} trigger={<Image fluid src={`https://bienvenidoainternet.org/${dir}/thumb/${post.thumb}`} />} />
                    </Segment> : null}
                <Segment>
                    <div className={`postMessage ${dir === "zonavip" ? "vipFont" : null}`} dangerouslySetInnerHTML={{ __html: post.message }} />
                    {locked ? null :
                        (<Label attached='bottom right'>
                            <Icon name="reply" />Responder
                                    </Label>)}
                </Segment>
            </Segment.Group>
        </Segment.Group>);
}

export default Post;