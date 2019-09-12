import React from "react";
import { Segment, Header, Image, Label, Icon } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";

const Post = ({ index, post, locked, dir }) => {
    const filesize = require('filesize');
    return (
        <Segment.Group>
            <Header as="h5" attached>
                #{index + 1} {post.name}
                <Header.Subheader className="inlineSubHeader">
                    <Moment fromNow unix locale="es" date={post.timestamp} />
                </Header.Subheader>
            </Header>

            <Segment.Group horizontal>
                {post.file !== "" ?
                    <Segment compact className="imageSegment">
                        <Label attached='bottom'>{post.file} {post.image_width}x{post.image_height} {filesize(post.file_size, { bits: true })}</Label>
                        <Image fluid src={`https://bienvenidoainternet.org/${dir}/thumb/${post.thumb}`} />

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