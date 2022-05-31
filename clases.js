class Memoria{
    constructor(tamaño){
        this.tamaño = tamaño
    }

    getTamaño(posicion){
        return this.tamaño[posicion];
    }

    insertarProceso(proceso,index){
        this.tamaño[index] = proceso;
    }

    eliminarProceso(index){
        this.tamaño[index] = 0;
    }
}

class Proceso{
    constructor(nombre, tamaño){
        this.nombre = nombre
        this.tamaño = tamaño
    }

    get nombre(){
        return this.nombre;
    }

    get tamaño(){
        return this.tamaño;
    }
}