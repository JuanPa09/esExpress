import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private tipoMapa:number = 0
    private tipoUbicaciones:number = 0



    public setTipoMapa(numero){
        this.tipoMapa = numero;
    }

    public setTipoUbicaciones(numero){
        this.tipoUbicaciones = numero;
    }

    public getTipoMapa():Number{
        return this.tipoMapa;
    }

    public getTipoUbicaciones(){
        return this.tipoUbicaciones;
    }

}