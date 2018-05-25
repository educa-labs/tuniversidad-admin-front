import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
    token: string;
    degree_types: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public provider_carreras: DataCarrerasProvider,
        public provider_areas: DataAreasProvider,
        public alertCtrl: AlertController,
        public storage: Storage) {
            // Recibir el id de la carrera seleccionada 
            this.degree_types = [{id:1, title:"Profesional"},{id:2,title:"Técnica"}];
            this.id_carrera_seleccionada = navParams.get('id_carrera');
            this.storage.get("user").then((data) => {
                this.token = data.token
                // Recibir toda la informacion de la carrera
                this.recibir_informacion(this.id_carrera_seleccionada);
                // Recibir las areas 
                this.recibir_areas();
            })
    };

    recibir_informacion(id_carrera) {
        /* recibir_informacion: funcion para recibir toda la informacion de la
        carrera seleccionada. Llama a la funcion del provider y guarda la info */

        this.provider_carreras.get_detalle_carrera(id_carrera, this.token)
            .then(data => {
                // Guardar la informacion recibida
                this.info_carrera = data;
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
            'description': this.info_carrera['description'],
            'degree_type': this.info_carrera['degree_type'],
            weighing: {
                'NEM': this.info_carrera.weighing['NEM'],
                'ranking': this.info_carrera.weighing['ranking'],
                'language': this.info_carrera.weighing['language'],
                'math': this.info_carrera.weighing['math'],
                'science': this.info_carrera.weighing['science'],
                'history': this.info_carrera.weighing['history']
            }
        };
        // Imprimir la info que se enviará a la funcion para actualizar
        console.log('Data actualizar carrera', data_a_enviar);

        this.provider_carreras.actualizar_carrera(data_a_enviar, this.id_carrera_seleccionada, this.token)
            .then(data => {
                console.log('Respuesta al actualizar', data);
            })
    };

    recibir_areas() {
        /* recibir_areas: funcion para recibir todas las areas. Llama a la funcion
        del provider y le manda el token */

        this.provider_areas.get_areas(this.token)
            .then(data => {
                // Guardar las areas 
                this.areas = data;
            })
    };

    borrar_carrera() {
        /* borrar_carerra: funcion para borrar la carrera. Primero muestra un alert de 
        confirmacion. Si se acepta se llama a funcion del provider. Si se cancela se
        borra el alert */

        let confirm = this.alertCtrl.create({
            title: 'Confirmar eliminar carrera',
            message: '¿Seguro quieres borras esta carrera? No hay vuelta atrás...',
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
                        console.log('Se apretó para que se borrara una carrera');
                        // Llamar a la funcion del provider 
                        this.provider_carreras.eliminar_carrera(this.id_carrera_seleccionada, this.token)
                            .then(data => {
                                if (data['status'] == 'success') {
                                    this.navCtrl.pop();
                                } else {
                                    alert('Ocurrió un error intentando borrar la carrera')
                                }
                            })
                     }
                }
            ]
        });
        // Mostrar alert de confirmacion
        confirm.present();
    };
}