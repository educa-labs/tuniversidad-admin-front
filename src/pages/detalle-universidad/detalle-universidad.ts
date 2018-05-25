import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
// Importar paginas
import { DetalleCarreraPage } from '../detalle-carrera/detalle-carrera';
import { DetalleCampusPage} from '../detalle-campus/detalle-campus'
import { AgregarCarreraPage } from '../agregar-carrera/agregar-carrera';
import { AgregarCampusPage } from '../agregar-campus/agregar-campus' 
// Importar providers
import { DataUniversidadesProvider } from '../../providers/data-universidades/data-universidades';
import { CampusProvider } from '../../providers/campus/campus';

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
    // Campuses de la universidad 
    campuses_universidad: any;
    token: string;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_universidades: DataUniversidadesProvider,
        public provider_campuses: CampusProvider,
        public alertCtrl: AlertController,
        public storage: Storage) {
            // Recibir el id de la universidad seleccionada
            this.id_universidad_seleccionada = navParams.get('id_universidad');
            this.storage.get("user").then((data) => {
                this.token = data.token
                // Recibir toda la informacion de la universidad 
                this.recibir_informacion(this.id_universidad_seleccionada);
                //recibir las carreras de la universidad
                this.get_carreras(this.id_universidad_seleccionada)
                // Recibir los campuses de la universidad 
                this.recibir_campuses(this.id_universidad_seleccionada);
            })
    }

    recibir_informacion(id_universidad) {
        /* recibir_informacion: funcion para recibir toda la informacion de la 
        universidad seleccionada. Llama a la funcion del provider y guarda la info */

        this.provider_universidades.get_detalle_universidad(id_universidad, this.token)
            .then(data => {
                // Guardar la informacion recibida
                this.info_universidad_seleccionada = data;
            })
    };

    //Para pedir las carreras de una universidad
    get_carreras(id_universidad) {
        this.provider_universidades.get_carreras_universidad(id_universidad, this.token)
            .then(data => {
                // Guardar la informacion recibida
                this.carreras_universidad = data;

            })
    }

    ver_carrera(id_carrera) {
        /* ver_carrera: funcion para la navegacion entre la lista de carreras de una
        universidad y su detalle. */
        // Navegacion y le pasa el id de la carrera a la nueva pagina 
        this.navCtrl.push(DetalleCarreraPage,{id_carrera: id_carrera});
    };

    ver_campus(id_campus) {
        this.navCtrl.push(DetalleCampusPage, {id_campus: id_campus})
    }

    actualizar_universidad() {
        /* actualizar_universidad: funcion para actualizar la informacion de una de 
        lcas universidades. Lo que hace es ordenar la data que se enviará y llama 
        a la funcion del provider */
        let data_a_enviar = {
            "title": this.info_universidad_seleccionada.title,
            "website": this.info_universidad_seleccionada.website,
            "motto": this.info_universidad_seleccionada.motto,
            "initials": this.info_universidad_seleccionada.initials,
            "freeness": this.info_universidad_seleccionada.freeness,
            "foundation": this.info_universidad_seleccionada.foundation,
            "teachers": this.info_universidad_seleccionada['teachers'],
            "postgraduates": this.info_universidad_seleccionada.postgraduates,
            "doctorates": this.info_universidad_seleccionada.doctorates,
            "description": this.info_universidad_seleccionada.description,
            "students": this.info_universidad_seleccionada.students,
            "degrees": this.info_universidad_seleccionada.degrees,
            "visits": this.info_universidad_seleccionada.visits,
        };

        console.log('Data a enviar', data_a_enviar);
        this.provider_universidades.actualizar_universidad(data_a_enviar, this.id_universidad_seleccionada, this.token)
            .then(data => {
                console.log('Respuesta al actualizar', data);
            })
    };

    recibir_campuses(id_universidad) {
        /* recibir_campuses: funcion para recibir todos los campuses de una universidad,
        Recibe el id de la universidad actual y consulta a la funcion del provider */
        this.provider_campuses.get_campuses_universidad(this.token, id_universidad)
            .then(data => {
                this.campuses_universidad = data;
                
            });
    };

    agregar_carrera() {
        /* agregar_carrera: funcion para la navegacion entre el detalle de una universidad 
        y la pagina para agregar carreas */
        // Push a la pagina para agregar carreras. Le pasa el id de la universidad 
        this.navCtrl.push(AgregarCarreraPage, {
            id_universidad: this.id_universidad_seleccionada
        });
    };

    agregar_campus() {
        this.navCtrl.push(AgregarCampusPage, {
            id_universidad: this.id_universidad_seleccionada
        });
    }

    destroy_universidad(id_universidad) {
        let confirm = this.alertCtrl.create({
            title: 'Confirmar eliminar universidad',
            message: '¿Seguro quieres borras esta universidad? No hay vuelta atrás...',
            buttons: [
                {
                    text: 'Cancelar',
                    handler: () => {
                        console.log('Se apretó cancelar');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        console.log('Se apretó para que se borrara una universidad');
                        // Llamar a la funcion del provider 
                        this.provider_universidades.delete_universidad(this.id_universidad_seleccionada, this.token)
                            .then(data => {
                                if (data['status'] == 'success') {
                                    this.navCtrl.pop();
                                } else {
                                    alert('Ocurrió un error intentando borrar la universidad')
                                }
                            })
                     }
                }
            ]
        });
        // Mostrar alert de confirmacion
        confirm.present();
    }

}