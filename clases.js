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

    eliminarProceso(id, nombre, gestionMemoria) {
        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];

            if (element.proceso != null) {

                if (element.proceso.id == id && element.proceso.nombre == nombre) {
                    this.segmentos[index].proceso = null;
                }
            }
        }

        switch (gestionMemoria) {
            case 2:
                this.dividirMemoria();
                break;
        }
    }

    insertarProceso(proceso, metodo, seleccionAjuste) {
        switch (metodo) {
            case 2:
                if (seleccionAjuste == 'primer') {
                    this.primerAjuste(proceso);
                } else if (seleccionAjuste == 'peor') {
                    this.peorAjuste(proceso);
                } else if (seleccionAjuste == 'mejor') {
                    this.mejorAjuste(proceso);
                }
                return this.dividirMemoria();
            case 3:
                if (seleccionAjuste == 'primer') {
                    return this.primerAjuste(proceso);
                } else if (seleccionAjuste == 'peor') {
                    return this.peorAjuste(proceso);
                } else if (seleccionAjuste == 'mejor') {
                    return this.mejorAjuste(proceso);
                }
            case 4:
                return this.estaticaFija(proceso);
            default:
                return 0;
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

    mejorAjuste(proceso) {
        // return 1 si el proceso no cabe en el segmento
        // return 0 si la memoria esta llena
        var mejor = 1048576 * 15;
        var cabe = false;
        var memoriaLlena = true;
        var segmento = 0;

        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];
            var dif = element.tamano - proceso.tamano;

            if (element.proceso === null) {
                if (dif < mejor && dif >= 0) {
                    mejor = dif;
                    segmento = index;
                    cabe = true;
                }
                memoriaLlena = false;
            }
        }

        if (memoriaLlena) {
            return 0;
        }

        if (cabe) {
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

    dividirMemoria() {
        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];
            if (element.proceso !== null) {
                if (element.proceso.tamano < element.tamano) {
                    var nuevoSeg = element.tamano - element.proceso.tamano;
                    var posicion = parseInt(element.posicion, 16) + parseInt(element.proceso.tamano);

                    element.tamano = parseInt(element.proceso.tamano);
                    this.segmentos.splice(index + 1, 0, { "proceso": null, "tamano": nuevoSeg, "posicion": componentToHex(posicion) });
                }
            }
        }

        for (let index = 0; index < this.segmentos.length; index++) {
            const element = this.segmentos[index];
            if (element.proceso === null) {
                if (index + 1 < this.segmentos.length) {
                    if (this.segmentos[index + 1].proceso === null) {
                        var nuevoSeg = element.tamano + this.segmentos[index + 1].tamano;
                        var posicion = parseInt(element.posicion, 16);

                        element.tamano = nuevoSeg;
                        this.segmentos.splice(index + 1, 1);
                        index -= 1;
                    }
                }
            }
        }
        return this.segmentos;
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