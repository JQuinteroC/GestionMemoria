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

var particionesVariables = [4, 3, 3, 2, 2, 1]
var gestionMemoria = 0;
var programasEjecutados = []

function llenarProgramas() {
    document.getElementById("programas").replaceChildren();
    for (let i = 0; i < programas.length; i++) {
        const programa = programas[i];

        var fila = "<tr><td>" + programa.nombre + "</td><td>" + programa.tamano + "</td><td><button name = 'btnEncender' class='btn btnEncender'" + " value='" + i + "' disabled>Encender</button>" + "</td></tr>";

        var btn = document.createElement("TR");
        btn.innerHTML = fila;
        document.getElementById("programas").appendChild(btn);
    };
}

function removeItemFromArr(arr, item) {
    return arr.filter(function (e) {
        return e.nombre !== item;
    });
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
}

function limpiarMemoria() {
    var canvas = document.getElementById("memoria");
    canvas.width = canvas.width;
}

function pintarMemoria(posicion, nombre) {
    var canvas = document.getElementById("memoria");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = 'blue';

        ctx.fillRect(0, posicion * 51, 300, 51);

        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = 'white';

        ctx.fillText(nombre, 150, 51 * (posicion + 1), 300);
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
            ctx.rect(0, index * 51, 300, 51);
            ctx.stroke();
        }
    }
}

function activarBotones(botones){
    for(let i = 0; i < botones.length; i++){
        var boton = botones[i]
        boton.disabled = false;
    }
}

function agregarListener() {
    //// Empezar el programa 
    var btnEmpezar = document.getElementById("empezar");
    
    btnEmpezar.addEventListener("click", function (){
        var seleccionAjuste = $('input:radio[name=ordenamiento]:checked').val();    
        var botones = document.getElementsByName("btnEncender");

        if(gestionMemoria != 0){
            if(seleccionAjuste == 'primer'){
                dibujarMemoria();
                pintarMemoria(15, "SO");
                activarBotones(botones);
            }else if(seleccionAjuste == 'peor'){
                dibujarMemoria();
                pintarMemoria(15, "SO");
                activarBotones(botones);
            }else if(seleccionAjuste == 'mejor'){
                dibujarMemoria();
                pintarMemoria(15, "SO");
                activarBotones(botones);
            }
        }
    })

    //// Acción para crear un programa
    var btnNuevoPrograma = document.getElementById("nuevoPrograma");
    btnNuevoPrograma.addEventListener("click", function () {
        var name = document.getElementsByName("name");
        var size = document.getElementsByName("size");
        if (name[0].value != "" && size[0].value != "") {
            programas.push({ "nombre": name[0].value, "tamano": size[0].value });
            llenarProgramas();
        } else {
            alert("Error en el llenado del formulario");
        }
    }, false)


    //// Acción para ejecutar programas existentes
    $('#tablaProgramas').on('click', '.btnEncender', function (event) {

        var $row = $(this).closest("tr"),
            $tds = $row.find("td");

        // confirmar si la memoria alcanza
        programasEjecutados.push({ "id": programasEjecutados.length + 1, "nombre": $tds[0].textContent, "tamano": $tds[1].textContent });

        llenarEjecutados();
    });

    //// Detener prorgamas en ejecución
    $('#tablaEjecutados').on('click', '.btnApagar', function (event) {
        limpiarMemoria();
        dibujarMemoria();

        var $row = $(this).closest("tr"),
            $tds = $row.find("td");

        programasEjecutados = removeItemFromArr(programasEjecutados, $tds[1].textContent);

        for (let i = 0; i < programasEjecutados.length; i++) {
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

    //// Selección de metodo de gestión de memoria
    var optMetodo = document.getElementById("selecProgramas");
    optMetodo.addEventListener("click", function () {

        switch (optMetodo.value) {
            case "1":
                console.log("Particionamiento Dinamico Con Compactacion");
                gestionMemoria = 1;
                break;
            case "2":
                console.log("Particionamiento Dinamico Sin Compactacion");
                gestionMemoria = 2;
                break;
            case "3":
                console.log("Particionamiento Estatico Variable");
                gestionMemoria = 3;
                document.getElementById("contMetodos").replaceChildren();
                for (let i = 0; i < particionesVariables.length; i++) {
                    console.log(particionesVariables[i]);

                    var fila = "<li>" + particionesVariables[i] + " Megabit" + "</li>";
                    var btn = document.createElement("LI");
                    btn.innerHTML = fila;
                    document.getElementById("contMetodos").appendChild(btn);
                }
                break;
            case "4":
                console.log("Particionamiento Estatico Fijo");
                gestionMemoria = 4;
                document.getElementById("contMetodos").replaceChildren();
                const particion = "<input type='text' name='cantidadParticiones' autocomplete='off' placeholder='Numero de particiones'>" + "</input>";
                var btn = document.createElement("DIV");
                btn.innerHTML = particion;
                document.getElementById("contMetodos").appendChild(btn);

                break;
            default:
                console.log("No se ha seleccionado");
                break;

        }
    }, false);
}

function init() {
    llenarProgramas();
    agregarListener();
}

init();