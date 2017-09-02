import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Importar providers
import { DataUsuariosProvider } from '../../providers/data-usuarios/data-usuarios';

@IonicPage()
@Component({
    selector: 'page-usuarios',
    templateUrl: 'usuarios.html',
})

export class UsuariosPage {
    /* UsuariosPage: pagina para mostrar toda la información de los usuarios. Al
    abrir el componente se llama a la funcion del provider y carga toda la info. */

    // Usuarios con Rut 
    cantidad_usuarios_con_rut: number;
    // Usuarios sin Rut 
    cantidad_usuarios_sin_rut: number;
    // Usuarios con metas 
    cantidad_usuarios_con_metas: number;
    promedio_metas_por_usuarios: number;
    // Usuarios con ensayos
    cantidad_usuarios_con_ensayos: number;
    promedio_ensayos_por_usuario: number;
    // Regiones
    region_mas_repetida:string;
    cantidad_usuarios_region: number;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private provider_usuarios: DataUsuariosProvider) {
            // Al iniciar se abre la info de los usuarios
            this.recibir_todos_usuarios();
    }

    recibir_todos_usuarios() {
        /* recibir_todos_usuarios: funcion para recibir la informacion basica de todos los
        usuarios. Usa la funcion del provider y guarda lo retornado */

        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.provider_usuarios.get_todos_los_usuarios(token)
            .then(data => {
                // Guardar info de usuarios con Rut 
                this.cantidad_usuarios_con_rut = data[0][0];
                // Guardar cantidad usuarios sin rut 
                this.cantidad_usuarios_sin_rut = data[0][1];
                // Guardar info de las metas 
                this.cantidad_usuarios_con_metas = data[1][0];
                this.promedio_metas_por_usuarios = data[1][1];
                // Guardar info de ensayos
                this.cantidad_usuarios_con_ensayos = data[2][0];
                this.promedio_ensayos_por_usuario = data[2][1];
                // Guardar informacion de la region mas repetida 
                this.region_mas_repetida = data[3][0];
                this.cantidad_usuarios_region = data[3][1];
            })
    }

}