import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataUsuariosService {
    /* DataUsuariosService: servicio para todo lo relacionado con la 
    información de los usuarios. */

    data_detalles: any;
    api: string = 'http://localhost:5000';

    constructor(private http: Http) { }

    detalle_usuario(id, token) {
        /* detalle_usuario: funcion para consultar toda la información
        de los usuarios. Recibe un id y token y consulta a la API la información */
        let headers = new Headers();
        headers.append('Accept', 'application/tuniversidad.v1');
        headers.append('Content-Type', 'application/json');
        headers.append('Token', token);

        return new Promise(resolve=> {
            // Hacer get a la API
            this.http.get(this.api + '/get_detalle_usuario/' + id, {headers: headers})
                .map(res=> res.json())
                .subscribe(data=> {
                    // Guardar data recibida
                    this.data_detalles = data;
                    resolve(this.data_detalles);
                })
        })
    }
}