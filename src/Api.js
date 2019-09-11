async function getBoards() {
    var ret = await fetch("https://bienvenidoainternet.org/cgi/api/boards")
        .then((response) => {
            return response.json();
        }).then((resource) => {
            //console.log(resource["boards"]);
            return resource["boards"];
        }).catch(console.error)

    return ret;
}

export default getBoards;