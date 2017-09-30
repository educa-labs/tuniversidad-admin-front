import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DataUsuariosProvider {

    // Informacion de todos los usuarios
    info_todos_los_usuarios: any;
    // Url de la api
    api: string = 'http://api.admin.tuniversidad.cl/';

    constructor(public http: Http, public loading: LoadingController) {}

    get_todos_los_usuarios(token) {
        /* get_totos_los_usuarios: funcion para recibir la informacion de todos
        los usuarios y ponerlos en una tabla. Guarda la info en una variable. */
        if (this.info_todos_los_usuarios) {
            return Promise.resolve(this.info_todos_los_usuarios);
        }
        // Crear loader 
        let loader = this.loading.create({content: 'Recibiendo información usuarios...'});
        // Mostrar loader en pantalla
        loader.present();
        // Retornar una promesa y guardar la información
        return new Promise(resolve => {
            // Headers para la consulta
            let headers = new Headers();
            headers.append('token', token);
            headers.append('Content-Type', 'application/json');
            // Hacer get a la API
            this.http.get(this.api + '/users', {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    // Guardar la informacion recibida
                    this.info_todos_los_usuarios = data;
                    console.log('Informacion de todos los usuarios', data);
                    // Resolver promesa
                    resolve(this.info_todos_los_usuarios);
                    // Desaparece loader de la pantalla
                    loader.dismiss();
                });
        }) 
    }
}