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
    "tamano": 1048576 / 2,
},
{
    "nombre": "Android Studio",
    "tamano": 1048576 * 6,
},
]

var particionesVariables = [4, 3, 3, 2, 2, 1]
var gestionMemoria = 0;
var programasEjecutados = []
var memoria = new Memoria();

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

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
        return e.id != item;
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

function pintarMemoria(posicionHex, nombre, tamano) {
    var canvas = document.getElementById("memoria");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        /// 51px = 1048576 bytes = 1 MiB
        /// 51*tamaño/1024*1024
        var posicion = 51 * parseInt(componentToHex(posicionHex), 16) / 1048576;
        var altura = 51 * tamano / 1048576;

        // Fondo
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);

        ctx.fillStyle = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        ctx.fillRect(0, posicion, 300, altura);

        // Texto
        ctx.font = "30px Arial";
        ctx.textAlign = "center";

        var o = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) / 1000);
        if (o > 125) {
            ctx.fillStyle = 'black';
        } else {
            ctx.fillStyle = 'white';
        }

        ctx.strokeRect(0, posicion, 300, altura);
        ctx.fillText(nombre, 150, posicion + altura / 1.5, 300);
    }
}

function dibujarMemoria(numParticiones) {
    var canvas = document.getElementById("memoria");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        const valor = 765 / numParticiones;

        for (let index = 0; index < numParticiones; index++) {
            ctx.rect(0, index * valor + 51, 300, valor);
            ctx.stroke();
        }
    }
}

function activarBotones(botones) {
    for (let i = 0; i < botones.length; i++) {
        var boton = botones[i]
        boton.disabled = false;
    }
}

function agregarListener() {
    //// Empezar el programa 
    var btnEmpezar = document.getElementById("empezar");
    btnEmpezar.addEventListener("click", function () {
        var seleccionAjuste = $('input:radio[name=ordenamiento]:checked').val();
        var botones = document.getElementsByName("btnEncender");
        memoria = new Memoria(1048576 * 15, null);

        if (gestionMemoria == 4) {
            var cantParticion = document.getElementsByName("cantidadParticiones");
            limpiarMemoria();
            dibujarMemoria(cantParticion[0].value);

            memoria.setMetodoFija(parseInt(cantParticion[0].value));

            pintarMemoria("000000", "SO", 1048576);
            activarBotones(botones);
        } else if (gestionMemoria != 0) {
            limpiarMemoria();
            if (seleccionAjuste == 'primer') {
                dibujarMemoria(15);
            } else if (seleccionAjuste == 'peor') {
                dibujarMemoria(15);
            } else if (seleccionAjuste == 'mejor') {
                dibujarMemoria(15);
            }
            pintarMemoria("000000", "SO", 1048576);
            activarBotones(botones);
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
    $('#tablaProgramas').unbind('click');
    $('#tablaProgramas').on('click', '.btnEncender', function (event) {

        var $row = $(this).closest("tr");
        var $tds = $row.find("td");

        ejecutarProceso($tds);
    });

    //// Detener prorgamas en ejecución
    $('#tablaEjecutados').unbind('click');
    $('#tablaEjecutados').on('click', '.btnApagar', function (event) {
        limpiarMemoria();
        dibujarMemoria(16);

        var $row = $(this).closest("tr"),
            $tds = $row.find("td");

        programasEjecutados = removeItemFromArr(programasEjecutados, $tds[0].textContent);

        for (let i = 0; i < programasEjecutados.length; i++) {
            programasEjecutados[i].id = i + 1
        }

        llenarEjecutados()
    });

    //// Selección de metodo de gestión de memoria
    var optMetodo = document.getElementById("selecProgramas");
    optMetodo.addEventListener("click", function () {
        var ordenamiento = document.getElementsByName("ordenamiento");
        switch (optMetodo.value) {
            case "1":
                console.log("Particionamiento Dinamico Con Compactacion");
                gestionMemoria = 1;
                $(".ordenamiento").show();

                ordenamiento[0].disabled = false;
                ordenamiento[1].disabled = false;
                ordenamiento[2].disabled = false;
                break;
            case "2":
                console.log("Particionamiento Dinamico Sin Compactacion");
                gestionMemoria = 2;
                $(".ordenamiento").show();

                ordenamiento[0].disabled = false;
                ordenamiento[1].disabled = false;
                ordenamiento[2].disabled = false;
                break;
            case "3":
                console.log("Particionamiento Estatico Variable");
                gestionMemoria = 3;
                $(".ordenamiento").show();
                document.getElementById("contMetodos").replaceChildren();
                for (let i = 0; i < particionesVariables.length; i++) {
                    console.log(particionesVariables[i]);

                    var fila = "<li>" + particionesVariables[i] + " Megabit" + "</li>";
                    var btn = document.createElement("LI");
                    btn.innerHTML = fila;
                    document.getElementById("contMetodos").appendChild(btn);
                }

                ordenamiento[0].disabled = false;
                ordenamiento[1].disabled = false;
                ordenamiento[2].disabled = false;

                break;
            case "4":
                console.log("Particionamiento Estatico Fijo");
                gestionMemoria = 4;
                $(".ordenamiento").hide();

                document.getElementById("contMetodos").replaceChildren();
                const particion = "<input type='text' name='cantidadParticiones' id = 'cantidadParticiones' autocomplete='off' placeholder='Numero de particiones'>" + "</input>";
                var btn = document.createElement("DIV");
                btn.innerHTML = particion;
                document.getElementById("contMetodos").appendChild(btn);

                ordenamiento[0].disabled = true;
                ordenamiento[1].disabled = true;
                ordenamiento[2].disabled = true;

                break;
            default:
                console.log("No se ha seleccionado");
                break;

        }
    }, false);
}

function ejecutarProceso(proceso) {
    var resultado = memoria.insertarProceso({ "id": programasEjecutados.length + 1, "nombre": proceso[0].textContent, "tamano": proceso[1].textContent }, gestionMemoria);

    if (resultado == 1) {
        alert("Memoria insuficiente");
    }

    if (resultado == 0) {
        alert("Memoria llena");
    }

    programasEjecutados.push({ "id": programasEjecutados.length + 1, "nombre": proceso[0].textContent, "tamano": proceso[1].textContent });
    llenarEjecutados();
    dibujarProcesos();
}

function dibujarProcesos() {
    var memoriaEstatica = memoria.getSegmentos();

    memoriaEstatica.forEach(segmento => {
        if (segmento.proceso !== null) {
            pintarMemoria(segmento.posicion, segmento.proceso.nombre, segmento.proceso.tamano);
        }
    });
}

function init() {
    llenarProgramas();
    agregarListener();
    dibujarMemoria(5);
}

init();