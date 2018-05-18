import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
// Importar providers   
import { CampusProvider } from '../../providers/campus/campus';
import { DataAreasProvider } from '../../providers/data-areas/data-areas';
import { DataCarrerasProvider } from '../../providers/data-carreras/data-carreras';

@Component({
    selector: 'page-agregar-carrera',
    templateUrl: 'agregar-carrera.html',
})
export class AgregarCarreraPage {
    /* AgregarCarreraPage: pagina para agregar una carrera a una 
    universidad en especifico. Recibe por navegacion el id de la universidad
    y lo guarda. */

    id_universidad: any;
    info_carrera_nueva: any;
    campuses_universidad: any;
    areas:any;
    token:string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_campuses: CampusProvider,
        public provider_areas: DataAreasProvider,
        public provider_carreras: DataCarrerasProvider,
        public storage: Storage) {
            this.storage.get("user").then((data) => {
                this.token = data.token
                // Recibir las areas 
                this.recibir_areas();
                // Recibir el id de la universidad
                this.id_universidad = navParams.get('id_universidad');
                // Recibir los campuses de la universidad
                this.recibir_campuses(this.id_universidad);
                // Setear la info de la nueva carrera
                this.info_carrera_nueva = {'university_id': this.id_universidad, 'weighing':{}};
            })
    };

    agregar_carrera() {
        /* agregar_carrera: funcion para enviar toda la informacion a agregar
        a la funcion del provider. Ordena toda la informacion que se enviará
        y llama a la función. */

        console.log('Data a enviar para agregar', this.info_carrera_nueva);
        this.provider_carreras.agregar_carrera(this.info_carrera_nueva, this.token)
            .then(data => {
                console.log('Respuesta del servidor al agregar carrera', data);
                if (data) {
                    this.navCtrl.pop();
                };
            });
    };

    recibir_areas() {
        /* recibir_areas:funcion funcion para recibir las areas. Llama a la funcion 
        del provider de las areas */

        this.provider_areas.get_areas(this.token)
            .then(data => {
                // Guardar las areas 
                this.areas = data;
            });
    };

    recibir_campuses(id_universidad) {
        /* recibir_campuses: funcion para recibir la lista con todos los campuses
        de la universidad. Recibe el id de la universidad y llama a la funcion del provider */

        this.provider_campuses.get_campuses_universidad(this.token, id_universidad)
            .then(data => {
                this.campuses_universidad = data;
            });
    };
}