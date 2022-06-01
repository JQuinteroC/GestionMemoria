class Memoria {
    constructor(tamano, procesos) {
        this.tamano = tamano
        this.procesos = procesos
    }

    getTamano() {
        return this.tamano;
    }

    getProcesos() {
        return this.procesos;
    }

    getProceso(posicion) {
        if (posicion < this.procesos.length - 1)
            return this.procesos[posicion];
        return null;
    }

    insertarProceso(proceso, index) {
        this.procesos[index] = new Proceso(proceso);
    }

    eliminarProceso(index) {
        this.procesos[index] = 0;
    }
}

class Proceso {
    constructor(id, nombre, tamano, posicion) {
        this.id = id
        this.nombre = nombre
        this.tamano = tamano
        this.posicion = posicion
    }

    get id() {
        return this.id;
    }

    get nombre() {
        return this.nombre;
    }

    get tamano() {
        return this.tamano;
    }

    get posicion() {
        return this.posicion;
    }
}