var canvas = document.getElementById("memoria");
if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    for (let index = 0; index < 16; index++) {
        if (index % 2 == 0) {

            ctx.fillStyle = 'black';
        } else {

            ctx.fillStyle = 'orange';
        }
        ctx.fillRect(0, index * 51, 300, 51);

    }


} else {
    alert("No encontrado");
}
