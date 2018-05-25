import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DataUniversidadesProvider {
    /* DataUniversidadesProvider: provider de la información de las universidades.
    Tiene todas las funciones necesarias para manejar la info. */

    // Url de la api
    api: string = 'http://localhost:3000';
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
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la api
            this.http.get(this.api + '/universities', {headers: headers})
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

    get_types() {

        let loader = this.loading.create({content: 'Recibiendo detalle...'});
        // Mostrar loader en pantalla
        loader.present();
        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            // Hacer get a la API 
            this.http.get(this.api + '/university_types/', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Tipos de universidad', data);
                    // Resolver promesa
                    resolve(data);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                })
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
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la API 
            this.http.get(this.api + '/universities/' + id_universidad, {headers: headers})
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

    get_carreras_universidad(id_universidad,token) {
        let loader = this.loading.create({content: 'Recibiendo carreras...'});
        // Mostrar loader en pantalla
        loader.present();
        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la API 
            this.http.get(this.api + '/universities/' + id_universidad + '/carreers', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    console.log('Información de las carreras', data);
                    // Resolver promesa
                    resolve(data);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                })
        })
    }

    actualizar_universidad(data_universidad, id_universidad, token) {
        /* actualizar_universidad: funcion para actualizar la informacion de una universidad
        lo que hace es recibir un json con toda la información de la universidad y la manda */
    
       let loader = this.loading.create({ content: 'Actualizando universidad...' });
       // Mostrar loader
       loader.present();
       return new Promise(resolve => {
           // Headers para hacer la consulta
           let headers = new Headers();
           headers.append('Authorization', token);
           headers.append('Content-Type', 'application/json');
           // Hacer patch a la API
           this.http.patch(this.api + '/universities/' + id_universidad, JSON.stringify(data_universidad), { headers: headers })
               .map(res => res.json())
               .subscribe(data => {
                   resolve(data);
                   loader.dismiss();
               })
       })
    }

    crear_universidad(data_universidad,token) {
        let loader = this.loading.create({ content: 'Creando universidad...' });
        // Mostrar loader
       loader.present();
       return new Promise(resolve => {
           // Headers para hacer la consulta
           let headers = new Headers();

           headers.append('Authorization', token);
           headers.append('Content-Type', 'application/json');
           // Hacer post a la API
           this.http.post(this.api + '/universities/', JSON.stringify(data_universidad), { headers: headers })
               .map(res => res.json())
               .subscribe(data => {
                   resolve(data);
                   loader.dismiss();
               })
       })
    }

    delete_universidad(id_universidad,token) {
        let loader = this.loading.create({ content: 'Eliminando carrera...' });
        loader.present();

        return new Promise(resolve => {
            // Headers para hacer la consulta
            let headers = new Headers();
            headers.append('Authorization', token);
            headers.append('Content-Type', 'application/json');

            this.http.delete(this.api + '/universities/' + id_universidad, { headers: headers })
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                    console.log('Data recibida al borrar una universidad', data);
                    loader.dismiss();
                }, error => {
                    alert('Ocurrió un error al intentar borrar una universidad');
                    console.log('Ocurrió un error al intentar borrar una universidad', error);
                    loader.dismiss();
                });
        });
    }

}