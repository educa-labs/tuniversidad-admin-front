import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class CampusProvider {
    /* campusprovider: provider con todas las funciones para controlar
    la informacion de los campuses */

    // Url de la api
    api: string = 'http://api.admin.tuniversidad.cl/';

    constructor(public http: Http, public loading: LoadingController) {};

    get_campuses_universidad(token, id_universidad) {
        /* get_campuses_universidad: funcion para recibir todos los campuses
        de la universidad que recibe */

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
            this.http.get(this.api + '/universities/' + id_universidad + '/campus', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Informacion de los campuses recibidos', data);
                    // Resolver promesa
                    resolve(data);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                });
        });
    };

}