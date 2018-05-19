import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CampusProvider } from '../../providers/campus/campus'
import { DataUniversidadesProvider } from '../../providers/data-universidades/data-universidades'

@Component({
  selector: 'page-agregar-campus',
  templateUrl: 'agregar-campus.html',
})
export class AgregarCampusPage {

  token: string;
  info_campus: any;
  ciudades: any;
  id_universidad: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider_campus: CampusProvider,
    public storage: Storage) {
      
      this.load_cities()
      this.id_universidad = navParams.get('id_universidad');
      this.storage.get("user").then((data) => {
        this.token = data.token
      })
      this.info_campus = {}
    }

    load_cities() {
      this.provider_campus.get_cities().then(data => {
        this.ciudades = data
      })
    }

  create_campus() {
    let data_a_enviar = {
      "title": this.info_campus.title,
      "lat": this.info_campus.lat,
      "long": this.info_campus.long,
      "address": this.info_campus.address,
      "city_id": this.info_campus.city_id,
      "university_id": this.id_universidad
    };

  console.log('Data a enviar', data_a_enviar);

  this.provider_campus.post_campus(data_a_enviar, this.token)
      .then(data => {
          console.log('Respuesta al crear', data);
      })
    }
};
