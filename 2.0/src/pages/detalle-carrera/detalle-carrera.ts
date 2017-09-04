import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-detalle-carrera',
    templateUrl: 'detalle-carrera.html',
})

export class DetalleCarreraPage {
    /* DetalleCarreraPage: pagina donde se ve toda la informacion de una 
    carrera en una universidad. Desde acá se puede editar la informacion */

    id_carrera_seleccionada: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams) {
            // Recibir el id de la carrera seleccionada 
            this.id_carrera_seleccionada = navParams.get('id_carrera');
    }

}