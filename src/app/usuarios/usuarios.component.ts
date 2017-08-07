import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
// Importar providers
import { DataUsuariosService } from '../_services/index';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {

    public tableData1: TableData;

    usuarios: any;
    columnas_mostradas = ['Id', 'Email', 'Rut', 'Token'];
    datos_usuarios: any;
    cantidad_usuarios: number;

    constructor(
        private http: Http, 
        private router: Router, 
        public data: DataUsuariosService) {}

    ngOnInit() {
        /* ngOnInit: funcion que se ejecuta cada vez que se inicia el componente
        al iniciarse recibe toda la información de los usuarios */
        this.recibir_usuarios();
    }

    public recibir_usuarios() {
        /* recibir_usuarios: funcion para recibir la información de todos los usuarios para la 
        tabla. Usa la funcion del provider que retorna un valor según lo guardado. */
        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.data.recibir_usuarios(token)
            .then(data => {
                this.usuarios = data;
                this.cantidad_usuarios = data.length;
            })
    }

    seleccionar_usuario(id) {
        /* seleccionar_usuario: funcion para navegacion entre tabla de usuarios y detalle de
        usuario. Lo que hace es cambiar la navegación y setear el parametro id en el router */
        console.log('Se apretó: ',id);
        this.router.navigate(['/users', id]);
    }
}