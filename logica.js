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

var particionesVariables = [4,3,3,2,2,1]

var programasEjecutados = []

function llenarProgramas() {
    document.getElementById("programas").replaceChildren();
    for (let i = 0; i < programas.length; i++) {
        const programa = programas[i];

        var fila = "<tr><td>" + programa.nombre + "</td><td>" + programa.tamano + "</td><td><button class='btn btnEncender'" + " value='" + i + "'>Encender</button>" + "</td></tr>";

        var btn = document.createElement("TR");
        btn.innerHTML = fila;
        document.getElementById("programas").appendChild(btn);
    };

    $('#tablaProgramas').on('click', '.btnEncender', function (event) {

        var $row = $(this).closest("tr"),
            $tds = $row.find("td");

        // confirmar si la memoria alcanza
        programasEjecutados.push({ "id": programasEjecutados.length + 1, "nombre": $tds[0].textContent, "tamano": $tds[1].textContent });

        llenarEjecutados();
    });
}

function removeItemFromArr( arr, item ) {
    return arr.filter( function( e ) {
        return e.nombre !== item;
    } );
};

function llenarEjecutados() {
    document.getElementById("ejecucion").replaceChildren();
    for (let i = 0; i < programasEjecutados.length; i++) {
        const programa = programasEjecutados[i];

        var fila = "<tr><td>" + programa.id + "</td><td>" + programa.nombre + "</td><td>" + programa.tamano + "</td><td><button class='btn btnApagar'" + " value='" + i + "'>Apagar</button>" + "</td></tr>";

        var btn = document.createElement("TR");
        btn.innerHTML = fila;
        document.getElementById("ejecucion").appendChild(btn);
    };


    $('#tablaEjecutados').on('click', '.btnApagar', function (event) {
        limpiarMemoria();
        dibujarMemoria();

        var $row = $(this).closest("tr"),
            $tds = $row.find("td");

        programasEjecutados = removeItemFromArr( programasEjecutados,  $tds[1].textContent);

        for (let i = 0; i < programasEjecutados.length; i++){
            programasEjecutados[i].id = i + 1
        }

        llenarEjecutados()

        //event.target.parentNode.parentNode.remove()
        
        //programasEjecutados.splice
        // Dibujar memorias
        // var $row = $(this).closest("tr"),
        //     $tds = $row.find("td");

        // $.each($tds, function () {
        //     console.log($(this).text());
        // });
    });
}

/*function llenarMetodos(){
    document.getElementById("metodos").replaceChildren();
    switch (){

    }
}*/

function limpiarMemoria() {
    var canvas = document.getElementById("memoria");
    canvas.width = canvas.width;
}

function pintarMemoria(posicion, nombre){
    var canvas = document.getElementById("memoria");
    if(canvas.getContext){
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'blue';
        
        ctx.fillRect(0, posicion * 51, 300, 51);

        ctx.font = "30px Arial";

        ctx.fillStyle = 'black';

        ctx.fillText(nombre, 70, 51*(posicion+1));
    }
}

function dibujarMemoria() {
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
    }
}

function agregarListener() {
    var btnNuevoPrograma = document.getElementById("nuevoPrograma");
    btnNuevoPrograma.addEventListener("click", function () {
        var name = document.getElementsByName("name");
        var size = document.getElementsByName("size");
        if (name[0].value != "" && size[0].value != ""){
            programas.push({ "nombre": name[0].value, "tamano": size[0].value });
            llenarProgramas();
        } else {
            alert("Error en el llenado del formulario");
        }
    }, false)
}

function gestionarMemoria(){
    var optMetodo = document.getElementById("selecProgramas");
    optMetodo.addEventListener("click", function(){
        
        switch (optMetodo.value){
            case "1":
                console.log("Particionamiento Dinamico Con Compactacion");
                break;
            case "2":
                console.log("Particionamiento Dinamico Sin Compactacion");
                break;
            case "3":
                console.log("Particionamiento Estatico Variable");
                //var table = document.createElement("TABLE");

                document.getElementById("contMetodos").replaceChildren();
                for (let i = 0; i < particionesVariables.length; i++){
                    console.log(particionesVariables[i]);

                    var fila = "<li>"+ particionesVariables[i] + " Megabit" + "</li>";
                    var btn = document.createElement("LI");
                    //table.innerHTML = btn;
                    btn.innerHTML = fila;
                    document.getElementById("contMetodos").appendChild(btn);

                }
                break;
            case "4":
                console.log("Particionamiento Estatico Fijo");
                
                document.getElementById("contMetodos").replaceChildren();
                const particion = "<input type='text' name='cantidadParticiones' autocomplete='off' placeholder='Numero de particiones'>"+"</input>";
                var btn = document.createElement("DIV");
                btn.innerHTML = particion;
                document.getElementById("contMetodos").appendChild(btn);

                break;
            default:
                console.log("No se ha seleccionado");
                break;
        
        }
    },false)             
}

function init() {
    llenarProgramas();
    dibujarMemoria();
    pintarMemoria(15,"proceso");
    agregarListener();
    gestionarMemoria();
}

init();