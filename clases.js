class Memoria {
    constructor(tamano) {
        this.segmentos = [{ "proceso": null, "tamano": tamano, "posicion": "100000" }]
    }

    getSegmentos() {
        return this.segmentos;
    }

    getProceso(id) {
        for (let index = 0; index < this.segmentos.length; index++) {
            const segmento = this.segmentos[index];
            if (segmento.proceso != null) {
                if (segmento.proceso.id == id) {
                    return segmento;
                }
            }
        }

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

    setMetodoVariable(segmentos) {
        const mega = 1048576;
        var posicion = 1048576;
        this.segmentos[0].tamano = mega * segmentos[0];
        for (let index = 1; index < segmentos.length; index++) {
            posicion = posicion + mega * segmentos[index - 1];
            this.segmentos.push({ "proceso": null, "tamano": mega * segmentos[index], "posicion": componentToHex(posicion) });
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
                    // return this.segmentos[index].posicion;
                }
            }
        }
    }

    insertarProceso(proceso, metodo) {
        switch (metodo) {
            case 3:
                return this.primerAjuste(proceso);
            case 4:
                return this.estaticaFija(proceso);
            default:
                break;
        }
    }

    primerAjuste(proceso) {
        // return 1 si el proceso no cabe en el segmento
        // return 0 si la memoria esta llena
        var memoriaLlena = true;
        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];

            if (element.proceso === null) {
                memoriaLlena = false;
                if (element.tamano >= proceso.tamano) {
                    this.segmentos[index].proceso = proceso;
                    return this.segmentos;
                }
            }
        }

        if (memoriaLlena)
            return 0;

        return 1;
    }

    peorAjuste(proceso) {
        // return 1 si el proceso no cabe en el segmento
        // return 0 si la memoria esta llena
        var memoriaLlena = true;
        var segmento = 0;
        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];
            if (element.proceso === null) {
                if (element.tamano > this.segmentos[segmento].tamano) {
                    segmento = index;
                    memoriaLlena = false;
                }
            }
        }

        if (memoriaLlena) {
            return 0;
        }

        if (this.segmentos[segmento].tamano >= proceso.tamano) {
            this.segmentos[segmento].proceso = proceso;
            return this.segmentos;
        }

        return 1;
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