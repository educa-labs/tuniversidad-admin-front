import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DataUniversidadesProvider {
    /* DataUniversidadesProvider: provider de la información de las universidades.
    Tiene todas las funciones necesarias para manejar la info. */

    // Url de la api
    api: string = 'http://localhost:5000';
    // Info de todas las universidades
    info_todas_las_universidades: any;

    constructor(public http: Http, public loading: LoadingController) {}

    get_todas_universidades(token) {
        /* get_todas_universidades: funcion para recibir la informacion basica de todas
        las universidades. Guarda esta info en una variable. */
        if (this.info_todas_las_universidades) {
            return Promise.resolve(this.info_todas_las_universidades);
        }
        // Crear loader 
        let loader = this.loading.create({content: 'Recibiendo universidades...'});
        // Mostrar loader 
        loader.present();
        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('token', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la api
            this.http.get(this.api + '/get_universities', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    // Guardar la información de las universidades 
                    this.info_todas_las_universidades = data;
                    console.log('Informacion de las universidades', data);
                    // Resolver promesa
                    resolve(this.info_todas_las_universidades);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                });
        })
    }

    get_detalle_universidad(id_universidad, token) {
        /* get_detalle_universidad: funcion para recibir la información detallada de una 
        universidad. Recibe un token y el id de la universidad a consultar */

        // Crear loader 
        let loader = this.loading.create({content: 'Recibiendo detalle...'});
        // Mostrar loader en pantalla
        loader.present();
        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('token', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la API 
            this.http.get(this.api + '/get_detalle_universidad/' + id_universidad, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Información de la universidad', data);
                    // Resolver promesa
                    resolve(data);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                })
        })
    }
}