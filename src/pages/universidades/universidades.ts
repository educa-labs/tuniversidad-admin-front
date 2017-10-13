import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Importar paginas 
import { DetalleUniversidadPage } from '../detalle-universidad/detalle-universidad';
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

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_universidades: DataUniversidadesProvider) {
            // Llamar a la funcion para recibir las universidades 
            this.get_universidades();
    };

    get_universidades() {
        /* get_universidades: funcion que llama a la funcion del provider para
        recibir informacion basica de las universidades */
        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.provider_universidades.get_todas_universidades(token)
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

}