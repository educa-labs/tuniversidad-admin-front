import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

export class User {
    /* Clase de un usuario para guardar la información del suauio actual.
    Recibe toda la información basica */
    id: number;
    name: string;
    email: string;
    token: string;

    constructor(
        id: number,
        name: string,
        email: string,
        token: string,) {
            // Setear la información del usuario actual
            this.id = id;
            this.name = name;
            this.email = email;
            this.token = token;
    }
}

@Injectable()
export class AuthProvider {

    api: string = 'http://localhost:3000';
    // Usuario actual
    usuario_actual: User;
    // Información recibida
    data: any;

    constructor(public http: Http, public loading: LoadingController) {}

    login(credenciales) {
        /* login: recibe las credenciales. Revisa si las credenciales son no nulas y 
        si lo son hace la consulta a la API */
        if (credenciales.email === null || credenciales.password === null) {
            return Observable.throw('Ingresa las credenciales.');
        } 
        // Si las credenciales son válidas
        else {
            return Observable.create(observer => {
                // Crear los headers para llamar a la API
                let headers = new Headers();
                headers.append('Accept', 'application/tuniversidad.v1');
                headers.append('Content-Type', 'application/json');
                let credenciales_a_mandar = {'session': {'email': credenciales.email, 'password': credenciales.password}}

                return this.http.post(this.api + '/sessions', JSON.stringify(credenciales_a_mandar), {headers: headers})
                    .map(res => res.json())
                    .subscribe(data => {
                        // Crear loader
                        let loader = this.loading.create({
                            content: 'Cargando...'
                        });
                        // Mostrar loader en pantalla
                        loader.present();
                        // Setear el usuario actual 
                        console.log('Información recibida en el login', data);
                        this.usuario_actual = new User(data.id, data.first_name, data.email,data.auth_token);
                        // El observer pasa solo si el usuario ingresado es admin
                        observer.next(data['admin']);
                        // Desaparece loader de pantalla
                        loader.dismiss();
                        // Completar observer
                        observer.complete();
                    });
            })
        }
    }

    public setUserInfo(value) {
        /* setUserInfo: Funcion para setear información del usuario
        actual */
        this.usuario_actual = value;
    }

    public get_usuario_actual_info() {
        /* get_usuario_actual_info: funcion para recibir la informacion del usuario actual */
        return this.usuario_actual
    }

}