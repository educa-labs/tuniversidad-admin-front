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
    // Información de todos los usuarios
    informacion_usuarios: any;

    constructor(private http: Http) { }

    recibir_usuarios(token) {
        /* recibir_usuarios: funcion para recibir la información de todos los usuarios
        si ya estaba cargada, muestra esa información y no la carga de nuevo. */
        if (this.informacion_usuarios) {
            return Promise.resolve(this.informacion_usuarios);
        }

        let headers = new Headers();
        headers.append('token', token);
        headers.append('Content-Type','application/json');

        return new Promise(resolve => {
            // Hacer GET a la API
            this.http.get('http://localhost:5000/get_users', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.informacion_usuarios = data;
                    resolve(this.informacion_usuarios);
                });
        })
    }

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