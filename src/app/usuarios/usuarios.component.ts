import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent {

    public tableData1: TableData;

    usuarios: any;
    columnas_mostradas = ['Id', 'Email', 'Rut', 'Token'];
    datos_usuarios: any;

    constructor(private http: Http, private router: Router) {
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
            });
    }

    onSelect(id) {
        console.log('Se apretó: ',id);
        this.router.navigate(['/users', id]);
    }
}