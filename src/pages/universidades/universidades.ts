import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
// Importar paginas 
import { DetalleUniversidadPage } from '../detalle-universidad/detalle-universidad';
import { AgregarUniversidadPage } from '../agregar-universidad/agregar-universidad'; 
// Importar providers
import { DataUniversidadesProvider } from '../../providers/data-universidades/data-universidades';

@Component({
    selector: 'page-universidades',
    templateUrl: 'universidades.html',
})

export class UniversidadesPage {
    /* UniversidadesPage: pagina donde se muestra una lista con info basica
    de las universidades */

    universidades: any;
    token: string

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_universidades: DataUniversidadesProvider,
        public storage: Storage) {
            // Extraemos token del usuario
            this.storage.get("user").then((data) => {
                this.token = data.token
                // Llamar a la funcion para recibir las universidades
                this.get_universidades();
            })
            
    };

    get_universidades() {
        /* get_universidades: funcion que llama a la funcion del provider para
        recibir informacion basica de las universidades */
        this.provider_universidades.get_todas_universidades(this.token)
            .then(data => {
                // Guardar la informacion de las universidades 
                this.universidades = data;
            });
    };

    ver_universidad(id_universidad) {
        /* ver_universidad: funcion para la navegación entre lista de universidades
        con detalle de una universidad */
        // Push a la pagina de detalle y le pasa la informacion
        this.navCtrl.push(DetalleUniversidadPage,{id_universidad: id_universidad}) 
    };

    agregar_universidad() {
        // funcion para la navegación que lleva a vista de crear universidad
        this.navCtrl.push(AgregarUniversidadPage) 
    }

}