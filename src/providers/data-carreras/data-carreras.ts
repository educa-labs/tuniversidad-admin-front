import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DataCarrerasProvider {
    /* DataCarrerasProvider: provider de la información de las carreras.
    Tiene todas las funciones necesarias para manejar la info */

    // Url de la API
    api: string = 'http://localhost:3000';

    constructor(public http: Http, public loading: LoadingController) {}

    get_detalle_carrera(id_carrera, token) {
        /* get_detalle_carrera: funcion para recibir la informacion detallada de una
        carrera. Recibe el token y el id de la universidad a consultar */

        // Crear loader
        let loader = this.loading.create({ content: 'Recibiendo detalle...' });
        // Mostrar loader en pantalla
        loader.present();
        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la API 
            this.http.get(this.api + '/carreers/' + id_carrera, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Informacion de la carrera', data);
                    // Resolver promesa
                    resolve(data);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                })
        }) 
    };

    actualizar_carrera(data_carrera, id_carrera, token) {
        /* actualizar_carrera: funcion para actualizar la informacion de una carrera
        lo que hace es recibir un json con toda la informacion y la manda */

        let loader = this.loading.create({ content: 'Actualizando carrera...' });
        loader.present();

        return new Promise(resolve => {
            // Headers para hacer la consulta 
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            // Hacer Patch a la API
            this.http.patch(this.api + '/carreers/' + id_carrera, JSON.stringify(data_carrera), { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Data al actualizar info carrera', data);
                    resolve(data);
                    loader.dismiss();
                })
        })
    };

    agregar_carrera(data_a_enviar, token) {
        /* agregar_carrera: funcion para agregar una carrera. Hace post a la API  */
        let loader = this.loading.create({ content: 'Agregando carrera...' });
        loader.present();

        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            // Hacer POST a la API 
            this.http.post(this.api + '/carreers', JSON.stringify(data_a_enviar), {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                    loader.dismiss();
                }, error => {
                    alert('Ocurrió un error al intentar agregar la carrera');
                    console.log('Ocurrió un error al intentar agregar la carrera', error);
                    loader.dismiss();
                });
        });
    };

    eliminar_carrera(id_carrera, token) {
        /* eliminar_carrera: funcion para eliminar una carrera. Recibe el id de la carrera
        y hace DELETE a la API */
        let loader = this.loading.create({ content: 'Eliminando carrera...' });
        loader.present();

        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');

            this.http.delete(this.api + '/carreers/' + id_carrera, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                    console.log('Data recibida al borrar una carrera', data);
                    loader.dismiss();
                }, error => {
                    alert('Ocurrió un error al intentar borrar una carrera');
                    console.log('Ocurrió un error al intentar borrar una carrera', error);
                    loader.dismiss();
                });
        });
    };
}