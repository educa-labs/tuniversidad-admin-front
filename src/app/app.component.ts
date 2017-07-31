import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    
    usuarios: any;

    constructor(
        private http: Http) {
            this.recibir_usuarios();      
            console.log('Pico');
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