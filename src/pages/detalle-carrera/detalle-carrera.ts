import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// Importar providers
import { DataCarrerasProvider } from '../../providers/data-carreras/data-carreras';
import { DataAreasProvider } from '../../providers/data-areas/data-areas';

@Component({
    selector: 'page-detalle-carrera',
    templateUrl: 'detalle-carrera.html',
})

export class DetalleCarreraPage {
    /* DetalleCarreraPage: pagina donde se ve toda la informacion de una 
    carrera en una universidad. Desde acá se puede editar la informacion */

    id_carrera_seleccionada: any;
    // Toda la informacion de la carrera 
    info_carrera: any;
    areas: any;
    area_nueva: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_carreras: DataCarrerasProvider,
        public provider_areas: DataAreasProvider) {
            // Recibir el id de la carrera seleccionada 
            this.id_carrera_seleccionada = navParams.get('id_carrera');
            // Recibir toda la informacion de la carrera
            this.recibir_informacion(this.id_carrera_seleccionada);
            // Recibir las areas 
            this.recibir_areas();
    };

    recibir_informacion(id_carrera) {
        /* recibir_informacion: funcion para recibir toda la informacion de la
        carrera seleccionada. Llama a la funcion del provider y guarda la info */
        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.provider_carreras.get_detalle_carrera(id_carrera, token)
            .then(data => {
                // Guardar la informacion recibida
                this.info_carrera = data['carrera'];
            })
    };

    actualizar_carrera() {
        /* actualizar_carrera: funcion para actualizar la informacion de una de
        las carreras. Lo que hace es ordenar la data que se enviará y llama a la
        funcion del provider pasandole la informacion */

        let data_a_enviar = {
            'area_id': this.info_carrera['area_id'],
            'title': this.info_carrera['title'],
            'visits': this.info_carrera['visits'],
            'semesters': this.info_carrera['semesters'],
            'price': this.info_carrera['price'],
            'schedule': this.info_carrera['schedule'],
            'openings': this.info_carrera['openings'],
            'employability': this.info_carrera['employability'],
            'income': this.info_carrera['income'],
            'last_cut': this.info_carrera['last_cut'],
            'description': this.info_carrera['description']
        };
        // Imprimir la info que se enviará a la funcion para actualizar
        console.log('Data actualizar carrera', data_a_enviar);

        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.provider_carreras.actualizar_carrera(data_a_enviar, this.id_carrera_seleccionada, token)
            .then(data => {
                console.log('Respuesta al actualizar', data);
            })
    };

    recibir_areas() {
        /* recibir_areas: funcion para recibir todas las areas. Llama a la funcion
        del provider y le manda el token */

        let token = 'fqH6AyiyhQMeqKM8MjMC';

        this.provider_areas.get_areas(token)
            .then(data => {
                // Guardar las areas 
                this.areas = data['data']['areas'];
            })
    };
}