import React from "react";
import { Segment, Header, Image, Label, Icon, Modal, Comment, Divider } from "semantic-ui-react";
import Moment from "react-moment";
import "moment/locale/es";

const ImageModal = ({ href, trigger }) => (
    <Modal trigger={trigger} basic size="fullscreen">
        <Modal.Content image>
            <Modal.Description style={{ "textAlign": "center" }}>
                <Image as="a" src={href} />
            </Modal.Description>
        </Modal.Content>
    </Modal>
);

const Post = ({ index, post, locked, dir, threadId }) => {
    const filesize = require('filesize');
    const seedrandom = require("seedrandom");
    const rng = seedrandom(threadId + index);
    const avatar = ["1372836", "6396408", "anime_charhan02", "anime_jyorujyu01", "anime_monar05", "anime_sasuga04", "anime_zonu01", "fuun", "gocchin_face", "iyou", "kuma", "nurupo_ga_2", "u_naoruyo_bath", "1k", "6za", "anime_giko01", "anime_jyorujyu02", "anime_morara01", "anime_shii01", "anime_zonu02", "gaku", "gomiopen", "jisakujien_2", "kuma2", "onigiri_seito", "u_okotowari_a", "2-1", "8028885", "anime_giko04", "anime_jyorujyu03", "anime_morara02", "anime_shii02", "aramaki", "gaku2", "goo_1", "jisakujien_xmas", "maimai", "otiketu48", "u_sofa", "2ppa", "8toushinnomonar16", "anime_giko10", "anime_kukkuru01", "anime_morara04", "anime_shii03", "aroeri-na32", "gaku3", "goo_3", "kantoku1", "makotan2_folder", "pc3", "wakannai1", "2syobo_2", "8toushinnomonar32", "anime_giko11", "anime_kuma01", "anime_nokar01", "anime_syobon01", "asopasomaso", "gekisya1", "gya-", "kappappa1", "mona", "pgya", "yakimochi", "3", "ace", "anime_giko12", "anime_kumaface01", "anime_okashi01", "anime_syobon03", "bikyakusan32", "giko1", "hagenin-shuriken", "kasa-ri", "mona_shiri", "sasuga1", "youkan", "3-2", "af1", "anime_giko13", "anime_loop", "anime_okashi02", "anime_tarn01", "bs", "gikog_gomibako", "hagurumaou", "kashiwamo-chi32", "mona_tya", "seito_2", "zonu_1", "3na", "af2", "anime_hossyu01", "anime_marara02", "anime_onigiri04", "anime_uwan01", "button1_03", "gikog_gyunyupack", "hikky", "kinokorusensei32", "monaazarashi_1", "soon", "zuzagiko48", "4-2", "ahya_xmas_2", "anime_imanouchi01", "anime_matanki01", "anime_saitama01", "anime_uwan02", "buun", "gikog_pimiento", "hikky_xmas_2", "kita_", "namaetukenai", "tasukete", "4248688", "aka", "anime_iyou02", "anime_matanki02", "anime_saitama02", "anime_uwan03", "chahan", "gikoinu", "hyou", "kodomona", "naoruyo", "torimasu1", "5007629", "ame", "anime_jien01", "anime_miruna01", "anime_saitama03", "anime_youkanman01", "dokuo1", "gikoneko", "iirasan_face", "konkon_folder", "nida", "torimasu2", "5296219", "anime_buun02", "anime_jien02", "anime_monar02", "anime_sasuga01", "anime_youkanman02", "file2_01", "gikoneko_1", "imanouchi_1", "kossorisan", "nigete", "u_ame", "5ta", "anime_charhan01", "anime_jien03", "anime_monar03", "anime_sasuga03", "anime_youkanman03", "fujisan", "gikoneko2", "iyahoo", "kotatu", "nono_ie", "u_hoshi"];
    let user_id = post.timestamp_formatted.split(" ID:")[1];
    const i = Math.round(rng() * avatar.length);
    const rndAvatar = avatar[i];

    return (
        <Comment>
            <Comment.Avatar src={`https://bienvenidoainternet.org/static/ico/${rndAvatar}.gif`} />
            <Comment.Content>
                <Comment.Author as='a'>#{index + 1} <span className={post.email === "sage" ? "username sage" : "username"}>{post.name}</span><span className="tripcode">{post.tripcode}</span></Comment.Author>
                <Comment.Metadata>
                    <Moment fromNow unix locale="es" date={post.timestamp} />
                </Comment.Metadata>
                <Comment.Text>
                    {post.file !== "" ?
                        <ImageModal href={`https://bienvenidoainternet.org/${dir}/src/${post.file}`} trigger={<Image className="postImage" src={`https://bienvenidoainternet.org/${dir}/thumb/${post.thumb}`} />} />
                        : null}
                    <div className={`postMessage ${dir === "zonavip" ? "vipFont" : null}`} dangerouslySetInnerHTML={{ __html: post.message }} />
                </Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Responder</Comment.Action><Comment.Action>Reportar</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    );

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