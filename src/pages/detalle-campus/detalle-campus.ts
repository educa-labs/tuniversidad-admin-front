import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CampusProvider } from '../../providers/campus/campus'
import { DataUniversidadesProvider } from '../../providers/data-universidades/data-universidades'


@Component({
  selector: 'page-detalle-campus',
  templateUrl: 'detalle-campus.html',
})
export class DetalleCampusPage {

  id_campus: any;
  token: string;
  info_campus: any;
  ciudades: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider_campus: CampusProvider,
    public alertCtrl: AlertController,
    public storage: Storage) {
      this.load_cities()
      this.id_campus = navParams.get('id_campus');
      this.storage.get("user").then((data) => {
        this.token = data.token
      })
      // recibir información del campus
      this.load_campus(this.id_campus)
  }

  load_campus(id_campus) {
    this.provider_campus.get_campus(id_campus).then( data => {
      this.info_campus = data;
    })

  }

  load_cities() {
    this.provider_campus.get_cities().then(data => {
      this.ciudades = data
    })
  }

  actualizar_campus(id_campus) {
    let data_a_enviar = {
      "title": this.info_campus.title,
      "lat": this.info_campus.lat,
      "long": this.info_campus.long,
      "address": this.info_campus.address,
      "city_id": this.info_campus.city_id
  };

  console.log('Data a enviar', data_a_enviar);
  this.provider_campus.update_campus(data_a_enviar, this.id_campus, this.token)
      .then(data => {
          console.log('Respuesta al actualizar', data);
      })
  }

  destroy_campus() {
    /* borrar_campus: funcion para borrar la campus. Primero muestra un alert de 
    confirmacion. Si se acepta se llama a funcion del provider. Si se cancela se
    borra el alert */

    let confirm = this.alertCtrl.create({
        title: 'Confirmar eliminar campus',
        message: '¿Seguro quieres borras este campus? No hay vuelta atrás...',
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
                    console.log('Se apretó para que se borrara el campus');
                    // Llamar a la funcion del provider 
                    this.provider_campus.delete_campus(this.id_campus, this.token)
                        .then(data => {
                            if (data['status'] == 'success') {
                                this.navCtrl.pop();
                            } else {
                                alert('Ocurrió un error intentando borrar el campus')
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
