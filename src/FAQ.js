import React from "react";
import { Header, Table, Segment, List, Divider } from "semantic-ui-react";
import { Link } from "@reach/router";

const FAQ = ({ nightMode }) => {
  return (
    <Segment inverted={nightMode}>
      <Header as="h2">Índice</Header>
      <List ordered inverted={nightMode}>
        <List.Item>
          Acerca de BaI
          <List.List>
            <List.Item as="a" href="#queEsBai">
              ¿Qué es BaI?
            </List.Item>
            <List.Item as="a" href="#esAnonimo">
              ¿Realmente es anónimo? ¿Es BaI seguro?
            </List.Item>
            <List.Item as="a" href="#quienACargo">
              ¿Quién está a cargo de BaI?
            </List.Item>
            <List.Item as="a" href="#nacionalidad">
              ¿Cuál es la nacionalidad de BaI?
            </List.Item>
            <List.Item as="a" href="#reglas">
              ¿Hay reglas que debo seguir?
            </List.Item>
          </List.List>
        </List.Item>

        <List.Item>
          Funcionamiento y Terminología
          <List.List>
            <List.Item as="a" href="#trip">
              ¿Cómo me identifico y qué es un trip?
            </List.Item>
            <List.Item as="a" href="#denuncia">
              ¿Cómo denuncio a alguien?
            </List.Item>
            <List.Item as="a" href="#sage">
              ¿Qué es "sage"?
            </List.Item>
            <List.Item as="a" href="#ids">
              ¿Qué son los IDs y cómo funcionan?
            </List.Item>
            <List.Item as="a" href="#extend">
              ¿Qué es EXTEND y cómo se usa?
            </List.Item>
            <List.Item as="a" href="#capcode">
              ¿Qué es la estrella que aparece en algunos nombres? ¿Qué es un
              cap?
            </List.Item>
          </List.List>
        </List.Item>
        <List.Item>
          Información adicional
          <List.List>
            <List.Item as="a" href="#weabot">
              weabot Script
            </List.Item>
            <List.Item as="a" href="#client">
              bai-client (vipper.tech)
            </List.Item>
          </List.List>
        </List.Item>
      </List>
      <Divider />
      <Header as="h2">Acerca de BaI</Header>
      <Header as="h3" id="queEsBai">
        ¿Qué es BaI?
      </Header>
      <p>
        <b>Bienvenido a Internet</b> es una comunidad en donde se puede
        conversar y compartir imágenes libremente sin necesidad de tener una
        cuenta, nombre, o identidad dentro del sitio. El sitio nace de una
        fuerte creencia en la libertad de expresión, y de que una conversación
        puede ser más entretenida y honesta cuando no existen identidades de por
        medio porque lo que tienes que decir y mostrar es mucho más importante.
      </p>
      <p>
        La idea es tener un ambiente simple y relajado y que al mismo tiempo
        escape del desastre que hay en muchas partes de Internet, como lo es la
        web 2.0 o la cultura &quot;chanera&quot;. Usualmente se abordan temas
        como tecnología, videojuegos, cultura de Internet, música, política,
        cultura retro, animé y material weeb en general, entre otros.
      </p>
      <p>
        Históricamente, BaI se basa en la ideología que tuvieron sitios como
        Ayashii World, Amezou, 2channel y Futaba Channel. A pesar de que la
        cultura occidental está mucho más enfocada en la individualidad,
        queremos que existan alternativas para personas que no se sientan a
        gusto en esos entornos.
      </p>
      <Header as="h3" id="esAnonimo">
        ¿Realmente es anónimo? ¿Es BaI seguro?
      </Header>
      <p>
        A pesar de que es posible usar un nombre, la mayoría de los usuarios no
        lo hacen a modo de formalidad. Al decir lo que realmente piensas sin
        ligarte a una identidad otros pueden criticar tu mensaje, pero nunca a
        ti personalmente. <i>Sin embargo</i>, en BaI sí se guarda internamente
        la dirección IP de la persona que envía un mensaje, pero esta
        información no se muestra públicamente bajo ningún caso.
      </p>
      <p>
        <b>
          No hay forma de saber quién escribió un mensaje, a menos que el autor
          lo haya especificado.
        </b>
      </p>
      <Header as="h3" id="quienACargo">
        ¿Quién está a cargo de BaI?
      </Header>
      <p>
        Bienvenido a Internet es mantenido por el staff de BaI, o{" "}
        <span className="ui text green">Staff ★</span>. Es un pequeño grupo
        anónimo y voluntario que funciona de manera horizontal (no hay rangos
        dentro del staff) y fuera de ciertas tareas de mantenimiento sus
        posiciones no son distintas a las de usuarios normales. Sus miembros han
        variado a través de los años por múltiples razones. Sin su ayuda, BaI no
        seguiría en pie como lo hace ahora. En estos momentos sus miembros son
        tres.
      </p>
      <p>
        El staff está siempre abierto a toda sugerencia y reclamo, por lo que si
        deseas contactarte con el staff, siéntete libre de dejar un mensaje en{" "}
        <Link to="/board/bai">Discusión de BaI</Link> o enviar un correo a{" "}
        <a href="mailto:burocracia@bienvenidoainternet.org">
          burocracia@bienvenidoainternet.org
        </a>
        .
      </p>
      <Header as="h3" id="nacionalidad">
        ¿Cuál es la nacionalidad de BaI?
      </Header>
      <p>
        En BaI se le permite el acceso al sitio y a postear a gente de todas las
        nacionalidades. Desde un principio en BaI se intentó no tener un foco
        especial en ningún país en específico, sin importar que la base de
        usuarios tienda a ser de algún que otro país.
      </p>
      <Header as="h3" id="reglas">
        ¿Hay reglas que debo seguir?
      </Header>
      <p>
        Creemos que la comunidad es capaz de decidir el rumbo de sí misma,{" "}
        <i>
          por lo que no existen reglas de comportamiento impuestas por el staff
        </i>
        , dejándolo en manos del sentido común de los usuarios.
      </p>
      <p>
        Sin embargo, en pos de mantener el sitio limpio y libre de problemas
        legales,{" "}
        <b>
          el staff se verá obligado a eliminar cualquier spam o material que sea
          considerado ilegal bajo la ley estadounidense.
        </b>
      </p>
      <Header as="h2">Funcionamiento y Terminología</Header>
      <Header as="h3" id="trip">
        ¿Cómo me identifico y qué es un trip?
      </Header>
      <p>
        A pesar de que convencionalmente no es común identificarse,{" "}
        <b>
          es posible hacerlo cuando la identidad del usuario sea relevante a la
          discusión
        </b>
        . Si necesitas identificarte en un hilo y no quieres que se hagan pasar
        por ti, puedes usar un <i>trip</i> o <i>tripcode</i> temporalmente. Un
        trip o tripcode es un sistema básico de identificación, y no es
        necesario registrarse ni nada por el estilo. Es tan simple como escribir
        en el campo de nombre:
      </p>
      <p>
        <code>MiNombre#miClave</code>
      </p>
      <p>
        Como nombre colocas un pseudónimo con el cual aparecerás (opcional, un
        trip puede usarse solo), y como clave coloca una palabra que solo tú
        sepas (máximo 8 caracteres); ambos separados por un signo gato (#).
        Después de enviar tu mensaje, la clave será encriptada en una serie de
        letras y números únicos que identifican esa clave.
      </p>
      <p>
        <b>Ejemplo</b>: Al escribir como nombre <code>Juanito#ejemplo</code>, al
        enviar el mensaje se traducirá a lo siguiente:
        <code>
          <span className="ui text green"> Juanito ◆NCCjFTOGjk</span>
        </code>
        <br />
        De esta forma solo tú podrás postear con ese código y demostrar que eres
        tú el que está escribiendo el mensaje.
      </p>
      <p>
        <b>Nota:</b> Cualquiera puede usar el nombre de quien sea, por lo que no
        hay garantía de que alguien no suplante tu identidad, ni siquiera usando
        un trip, ya que son relativamente fáciles de crackear.
      </p>
      <p>
        Para realizar una cita, sólo debes anteponer un símbolo de mayor que
        (&quot;&gt;&quot;) al texto que quieres citar, de la misma forma que se
        hace en servicios de e-mail o grupos de noticias de antaño.
      </p>
      <Header as="h3" id="denuncia">
        ¿Cómo denuncio a alguien?
      </Header>
      <p>
        Si crees que otra persona postea spam o material ilegal, o alguna otra
        razón especial, puedes pedirle al staff que lo elimine presionando el
        botón rep en la parte superior de dicho post. Si piensas que se le
        debería prohibir el acceso temporal o permanentemente a algún usuario,
        recomendamos sugerirlo y discutirlo en la sección de sugerencias del
        sitio.
      </p>
      <Header as="h3" id="sage">
        ¿Qué es &quot;sage&quot;?
      </Header>
      <p>
        Normalmente un hilo de conversación salta al principio una vez que
        respondes en él, al igual que en foros tradicionales. Si por cualquier
        razón deseas que el hilo no haga esto, puedes insertar la palabra
        &quot;sage&quot; en el campo de e-mail al momento de postear en él.
      </p>
      <p>
        Además, usar sage ocultará la ID de tu post en las secciones (o hilos en
        boards sin IDs, en caso de haber usado <i>EXTEND</i>) que lo permitan.
      </p>
      <Header as="h3" id="ids">
        ¿Qué son los IDs y cómo funcionan?
      </Header>
      <p>
        El ID es una serie de 8 letras y números que identifican únicamente al
        autor de un mensaje, manteniendo su anonimato. Este identificador sólo
        aparece en algunas secciones específicas, pero el creador de un hilo
        también puede especificar que aparezcan IDs en su hilo si así lo desea,
        usando la función EXTEND al momento de crear el hilo
      </p>
      <p>
        <b>
          Por razones de privacidad, este identificador cambia cada 24 horas y
          es distinto en cada hilo.
        </b>
      </p>
      <p>
        Adicionalmente, desde el 03/04/16, el ID contiene un sufijo que indica
        desde dónde se ha enviado el mensaje. Los sufijos posibles actualmente
        son:
      </p>
      <Table celled striped compact collapsing inverted={nightMode}>
        <Table.Body>
          <Table.Row>
            <Table.Cell>R</Table.Cell>
            <Table.Cell>Aplicación Android</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>a</Table.Cell>
            <Table.Cell>Navegador Android</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>i</Table.Cell>
            <Table.Cell>Navegador iPhone</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Q</Table.Cell>
            <Table.Cell>Otro celular</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>T</Table.Cell>
            <Table.Cell>Nodo Tor</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>0</Table.Cell>
            <Table.Cell>PC u otro</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled striped compact collapsing inverted={nightMode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>Solo ID Detallada</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>F</Table.Cell>
            <Table.Cell>Mozilla Firefox</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>C</Table.Cell>
            <Table.Cell>Google Chrome</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>s</Table.Cell>
            <Table.Cell>Safari</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>S</Table.Cell>
            <Table.Cell>SeaMonkey</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>o</Table.Cell>
            <Table.Cell>Opera</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>I</Table.Cell>
            <Table.Cell>Internet Explorer</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>E</Table.Cell>
            <Table.Cell>Microsoft Edge</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled striped compact collapsing inverted={nightMode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>Extra</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>!</Table.Cell>
            <Table.Cell>Proxy y/o IP de país no hispano</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>#</Table.Cell>
            <Table.Cell>IP en lista negra</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p></p>
      <Header as="h3" id="extend">
        ¿Qué es EXTEND y cómo se usa?
      </Header>
      <p>
        EXTEND es una función para tomar opciones de la sección que normalmente
        son fijas (como la visibilidad de los IDs) y cambiarlas temporalmente
        dentro de un hilo al momento de crearlo. Para usarlo, se debe escribir
        el siguiente comando <b>en la primera línea del mensaje</b> al momento
        de crear un hilo:
      </p>
      <p>
        <code>!extend:(opción 1):(opción 2)</code>
      </p>
      <p>Las opciones disponibles son:</p>
      <Table celled striped compact collapsing inverted={nightMode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Opción 1</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>default</Table.Cell>
            <Table.Cell>No cambiar</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>no</Table.Cell>
            <Table.Cell>Desactivar</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>yes</Table.Cell>
            <Table.Cell>Activar, excepto con sage</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>force</Table.Cell>
            <Table.Cell>Activar siempre</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>extra</Table.Cell>
            <Table.Cell>Activar siempre, IDs detalladas</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table celled striped compact collapsing inverted={nightMode}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Opción 2</Table.HeaderCell>
            <Table.HeaderCell>ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>default</Table.Cell>
            <Table.Cell>No cambiar</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>no</Table.Cell>
            <Table.Cell>Desactivar</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>yes</Table.Cell>
            <Table.Cell>Mostrar hash</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>domain</Table.Cell>
            <Table.Cell>Mostrar dominio</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>country</Table.Cell>
            <Table.Cell>Mostrar país</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>verbose</Table.Cell>
            <Table.Cell>Mostrar hash y parte de IP</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>all</Table.Cell>
            <Table.Cell>Mostrar todo</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <p>
        Por ejemplo, colocar <code>!extend:yes:domain</code> en la prímera linea
        del mensaje al crear un hilo hace que todos los mensajes en ese hilo
        aparezcan con ID (excepto con sage) y con el dominio del autor.
        Asimismo,
        <code>!extend:force</code> hace que todos los mensajes en el hilo
        aparezcan con ID.
      </p>
      <p>
        Nótese que esta función no está habilitada en las siguientes secciones:{" "}
        <b>Meta, World Lobby</b>
      </p>
      <Header as="h3" id="capcode">
        ¿Qué es la estrella que aparece en algunos nombres? ¿Qué es un cap?
      </Header>
      <p>
        En algunos mensajes aparece una estrella (
        <span className="ui text green">★</span>) a la derecha del nombre. Esto
        se llama <i>cap</i> o <i>capcode</i> e indica que la identidad del autor
        del mensaje ha sido verificada. Solo algunas personas pueden tener un
        cap o capcode.
      </p>
      <p>
        Los miembros del staff de BaI utilizan el cap{" "}
        <span className="ui text green">Staff ★</span> de manera colectiva.
        Otras personas ajenas al staff también pueden tener sus propios caps, y
        debido a esto,{" "}
        <b>que un autor tenga cap no quiere decir que sea miembro del staff</b>,
        a excepción de <span className="ui text green">Staff ★</span>,
        obviamente.
      </p>
      <p>
        Si por alguna razón necesitas un cap puedes{" "}
        <a href="mailto:burocracia@bienvenidoainternet.org">
          contactar al staff directamente
        </a>
        .
      </p>
      <Header as="h2">Información adicional</Header>
      <Header as="h3" id="weabot">
        weabot Script
      </Header>
      <p>
        weabot es el script que usa este sitio para los BBS e Imageboards. Fue
        creado colaborativamente por antiguos y nuevos miembros del staff de
        BaI, utilizando el framework de{" "}
        <a href="https://github.com/tslocum/PyIB-Standalone">PyIB</a> y continúa
        constantemente en desarrollo.
      </p>
      <p>
        El código fuente se encuentra disponible en{" "}
        <a href="https://git.bienvenidoainternet.org/bai/weabot/">
          https://git.bienvenidoainternet.org/bai/weabot/
        </a>
        . Está bajo la licencia{" "}
        <a href="http://www.gnu.org/licenses/agpl-3.0.html">AGPLv3</a>, por lo
        que si no estás de acuerdo con los términos, te recomendamos usar una de
        las varias alternativas.
      </p>
      <p>
        También usa partes del proyecto{" "}
        <a href="http://wakaba.c3.cx/">Kareha/Wakaba</a>, un excelente script
        con funcionalidades similares.
      </p>
      <Header as="h3" id="client">
        bai-client (vipper.tech)
      </Header>
      <p>
        bai-client es una <i>app</i> escrita en JavaScript con la framework
        ReactJS+Semantic UI, desarrollada por{" "}
        <span className="ui text green">Renard ★</span>, bajo la licencia{" "}
        <a href="http://www.wtfpl.net/about/">WTFPL</a>. El código fuente está
        disponible en{" "}
        <a href="https://github.com/Renard1911/bai-client">GitHub</a> y en el{" "}
        <a href="https://git.bienvenidoainternet.org/Renard/bai-client/">
          repositorio de BaI
        </a>
        .
      </p>
    </Segment>
  );
};

export default FAQ;
