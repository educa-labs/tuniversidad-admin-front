import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  universidades: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider_campus: CampusProvider,
    public storage: Storage) {
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

  actualizar_campus(id_campus) {
    let data_a_enviar = {
      "title": this.info_campus.title,
      "lat": this.info_campus.lat,
      "long": this.info_campus.long,
      "address": this.info_campus.address,
  };

  console.log('Data a enviar', data_a_enviar);
  this.provider_campus.update_campus(data_a_enviar, this.id_campus, this.token)
      .then(data => {
          console.log('Respuesta al actualizar', data);
      })
  }

}
