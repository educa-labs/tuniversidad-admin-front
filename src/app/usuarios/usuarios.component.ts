import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

    usuarios: any;

    constructor(private http: Http) {
        this.recibir_usuarios();      
    }

    public recibir_usuarios() {
        let headers = new Headers();
        headers.append('token', 'fqH6AyiyhQMeqKM8MjMC');
        headers.append('Content-Type','application/json');

        this.http.get('http://localhost:5000/get_users', {headers: headers})
            .map(res => res.json())
            .subscribe(data => {
                this.usuarios = data;
                console.log(data);
            });
    }

}