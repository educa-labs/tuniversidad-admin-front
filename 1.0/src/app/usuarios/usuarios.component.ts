import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import { MdDialog } from '@angular/material';
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

    // Tablas para mostrar información
    public tableData1: TableData;
    columnas_tabla_1 = ['Id', 'Email', 'Rut', 'Ciudad'];
    columnas_tabla_2 = ['Id', 'Email', 'Última sesión', 'Creado'];
    // Usuarios con Rut
    cantidad_usuarios_con_rut: number;
    usuarios_con_rut: any;
    // Usuarios sin Rut
    usuarios_sin_rut: any;
    cantidad_usuarios_sin_rut: number;
    // Usuarios con metas
    cantidad_usuarios_con_metas: number;
    promedio_metas_por_usuarios: number;
    // Usuarios con ensayos
    cantidad_usuarios_con_ensayos: number;
    promedio_ensayos_por_usuario: number;
    // Regiones
    region_mas_repetida: string;
    cantidad_usuarios_region: number;

    constructor(
        private http: Http, 
        private router: Router, 
        public data: DataUsuariosService,
        public dialog: MdDialog) {}

    ngOnInit() {
        /* ngOnInit: funcion que se ejecuta cada vez que se inicia el componente
        al iniciarse recibe toda la información de los usuarios */
        this.recibir_usuarios();
    }

    public recibir_usuarios() {
        /* recibir_usuarios: funcion para recibir la información de todos los usuarios para la 
        tabla. Usa la funcion del provider que retorna un valor según lo guardado. */
        
        let loader = this.dialog.open(DialogUsuarios, {disableClose: true});
        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.data.recibir_usuarios(token)
            .then(data => {
                // Guardar los usuarios con RUT
                this.usuarios_con_rut = data[0][0];
                this.cantidad_usuarios_con_rut = data[0][0].length;
                // Guardar usuarios sin Rut
                this.usuarios_sin_rut = data[0][1];
                this.cantidad_usuarios_sin_rut  = data[0][1].length;
                // Guardar la cantidad de usuarios con metas
                this.cantidad_usuarios_con_metas = data[1][0];
                this.promedio_metas_por_usuarios = data[1][1];
                // Guardar la cantidad de usuarios con ensayos
                this.cantidad_usuarios_con_ensayos = data[2][0];
                this.promedio_ensayos_por_usuario = data[2][1];
                // Guardar la informacion de la region mas repetida
                this.region_mas_repetida = data[3][0];
                this.cantidad_usuarios_region = data[3][1];
                 
                 loader.close();
            })
    }

    seleccionar_usuario(id) {
        /* seleccionar_usuario: funcion para navegacion entre tabla de usuarios y detalle de
        usuario. Lo que hace es cambiar la navegación y setear el parametro id en el router */
        console.log('Se apretó: ',id);
        this.router.navigate(['/users', id]);
    }
}

@Component({
  selector: 'dialog-usuarios',
  templateUrl: 'dialog-usuarios.html',
})
export class DialogUsuarios {}