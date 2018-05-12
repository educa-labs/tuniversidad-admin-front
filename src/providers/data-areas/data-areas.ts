import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DataAreasProvider {
    /* DataAreasProvider: provider para toda la información de las areas.
    Tiene todas las funciones necesarias para manejar la informacion */

    // Url de la API 
    api: string = 'http://localhost:3000';
    // Areas guardadas
    areas_guardadas: any;

    constructor(public http: Http, public loading: LoadingController) {}

    get_areas(token) {
        /* get_areas: funcion para recibir todas las areas. Recibe el token 
        y hace un GET a la API */
        if (this.areas_guardadas) {
            return Promise.resolve(this.areas_guardadas);
        }
        // Crear loader 
        let loader = this.loading.create({ content: 'Recibiendo detalle...' });
        // Mostrar loader en pantalla
        loader.present();
        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('token', token);
            headers.append('Content-Type', 'application/json');
            // Hacer GET a la API 
            this.http.get(this.api + '/areas', { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Areas recibidas', data);
                    // Resolver promesa
                    resolve(data);
                    // Desaparece loader de la pantala 
                    loader.dismiss();
                })
        })
    }
}