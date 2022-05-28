var tablaProgramas = document.getElementById("tablaProgramas");

var programas = [{
    "nombre": "Word",
    "tamano": 1048576,
},
{
    "nombre": "Excel",
    "tamano": 1048576 * 2,
},
{
    "nombre": "Adobe Reader",
    "tamano": 1048576,
},
{
    "nombre": "NetBeans",
    "tamano": 1048576 * 3,
},
{
    "nombre": "IntelliJ",
    "tamano": 1048576 * 3,
},
{
    "nombre": "Sublime Text",
    "tamano": 524288,
},
{
    "nombre": "Android Studio",
    "tamano": 6291456,
},
]

for (let i = 0; i < programas.length; i++) {
    const programa = programas[i];

    var fila = "<tr><td>" + programa.nombre + "</td><td>" + programa.tamano + "</td><td><button class='btn btnEliminar'" + " value='" + i + "'>Encender</button>" + "</td></tr>";

    var btn = document.createElement("TR");
    btn.innerHTML = fila;
    document.getElementById("programas").appendChild(btn);
};



$('#tablaProgramas').on('click', '.btnEliminar', function (event) {

    var $row = $(this).closest("tr"),       // Finds the closest row <tr> 
        $tds = $row.find("td");             // Finds all children <td> elements

    $.each($tds, function () {               // Visits every single <td> element
        console.log($(this).text());        // Prints out the text within the <td>
    });

});

// var canvas = document.getElementById("memoria");
// if (canvas.getContext) {
//     var ctx = canvas.getContext("2d");

//     for (let index = 0; index < 16; index++) {
//         if (index % 2 == 0) {

//             ctx.fillStyle = 'black';
//         } else {

//             ctx.fillStyle = 'orange';
//         }
//         ctx.fillRect(0, index * 51, 300, 51);

//     }


// } else {
//     alert("No encontrado");
// }
