class Memoria {
    constructor(tamano) {
        this.segmentos = [{ "proceso": null, "tamano": tamano, "posicion": "100000" }]
    }

    getSegmentos() {
        return this.segmentos;
    }

    getProceso(index) {
        if (index < this.segmentos.length - 1)
            return this.segmentos[index].proceso;
        return null;
    }

    setMetodoFija(segmentos) {
        const tamSeg = this.segmentos[0].tamano / segmentos;
        var posicion = 1048576;
        this.segmentos[0].tamano = tamSeg;
        for (let index = 0; index < segmentos - 1; index++) {
            posicion = posicion + tamSeg;
            this.segmentos.push({ "proceso": null, "tamano": tamSeg, "posicion": componentToHex(posicion) });
        }
    }

    setMetodoVariable(segmentos){
        const mega = 1048576;
        var posicion = 1048576;
        console.log(segmentos);
        this.segmentos[0].tamano = mega * segmentos[0];
        for (let index = 1; index < segmentos.length; index++){
            posicion = posicion + mega * segmentos[index-1];
            this.segmentos.push({ "proceso": null, "tamano": mega * segmentos[index], "posicion": componentToHex(posicion)});
        }
    }

    getTotalMemoria() {
        var count = 0;
        this.segmentos.forEach(segmento => {
            count += segmento.tamano;
        });
        return count;
    }

    eliminarProceso(id, nombre){
        for(let index = 0; index < this.segmentos.length; index++){
            const element = this.segmentos[index];

            if(element.proceso != null){

                if(element.proceso.id == id && element.proceso.nombre == nombre){
                    this.segmentos[index].proceso = null;
                }
            }
        }
    }

    insertarProceso(proceso, metodo) {
        switch (metodo) {
            case 3:
                return this.estaticaFija(proceso);
            case 4:
                return this.estaticaFija(proceso);
            default:
                break;
        }
    }

    estaticaFija(proceso) {
        // return 1 si el proceso no cabe en el segmento
        // return 0 si la memoria esta llena
        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];

            if (element.proceso === null) {
                if (element.tamano < proceso.tamano) {
                    return 1;
                }
                this.segmentos[index].proceso = proceso;
                return this.segmentos;
            }
        }
        return 0;
    }
}

class Proceso {
    constructor(id, nombre, tamano, posicion) {
        this.id = id
        this.nombre = nombre
        this.tamano = tamano
        this.posicion = posicion
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getTamano() {
        return this.tamano;
    }

    getPosicion() {
        return this.posicion;
    }
}