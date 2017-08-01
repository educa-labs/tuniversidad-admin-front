import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    /* AuthService: servicio para la autentificación del usuario. Guarda la
    información del usuario en el localstorage y en el caso del logout la borra. */

    api: string = 'http://localhost:5000';

    constructor(private http: Http) { }

    login(email: string, password: string) {
        /* login: Funcion para hacer login del usuario. Se conecta al endpoint de login 
        que retorna true o false. */
        let headers = new Headers();
        headers.append('Accept', 'application/tuniversidad.v1');
        headers.append('Content-Type', 'application/json');

        let credenciales = {"session":{"email": email,"password": password}}

        return this.http.post(this.api + '/login', JSON.stringify(credenciales), {headers: headers})
            .map(res => {
                let respuesta = res.json();
                if (respuesta) {
                    // Guardar en el localstorage el usuario actual
                    localStorage.setItem('currentUser', JSON.stringify(respuesta));
                }
                return respuesta;
            });
    }

    logout() {
        /* logout: funcion para cerrar sesión. Borra el usuario actual guardado en el 
        localstorage */
        localStorage.removeItem('currentUser');
    }
}