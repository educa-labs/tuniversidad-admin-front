import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Importar paginas
import { DetalleCarreraPage } from '../detalle-carrera/detalle-carrera';
// Importar providers
import { DataUniversidadesProvider } from '../../providers/data-universidades/data-universidades';

@IonicPage()
@Component({
    selector: 'page-detalle-universidad',
    templateUrl: 'detalle-universidad.html',
})
export class DetalleUniversidadPage {
    /* DetalleUniversidadPage: pagina con toda la información detallada de la 
    universidad seleccionada. Desde acá se puede editar la información de la u */

    // Id de la universidad seleccionada antes
    id_universidad_seleccionada: any;
    // Toda la informacion de la universidad seleccionada
    info_universidad_seleccionada: any;
    // Las carreras de la universidad 
    carreras_universidad: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_universidades: DataUniversidadesProvider) {
            // Recibir el id de la universidad seleccionada
            this.id_universidad_seleccionada = navParams.get('id_universidad');
            // Recibir toda la informacion de la universidad 
            this.recibir_informacion(this.id_universidad_seleccionada);
    }

    recibir_informacion(id_universidad) {
        /* recibir_informacion: funcion para recibir toda la informacion de la 
        universidad seleccionada. Llama a la funcion del provider y guarda la info */
        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.provider_universidades.get_detalle_universidad(id_universidad, token)
            .then(data => {
                // Guardar la informacion recibida
                this.info_universidad_seleccionada = data[0];
                // Guardar las carreras de la universidad 
                this.carreras_universidad = data[1];
            })
    }

    ver_carrera(id_carrera) {
        /* ver_carrera: funcion para la navegacion entre la lista de carreras de una
        universidad y su detalle. */
        // Navegacion y le pasa el id de la carrera a la nueva pagina 
        this.navCtrl.push(DetalleCarreraPage,{id_carrera: id_carrera});
    }

}