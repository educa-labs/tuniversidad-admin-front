import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';
import { DataUniversidadesProvider } from '../../providers/data-universidades/data-universidades'


@Component({
  selector: 'page-agregar-universidad',
  templateUrl: 'agregar-universidad.html',
})
export class AgregarUniversidadPage {

  info_universidad_agregar: object;
  token:string;
  university_types: any;
  university_levels: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider_universidades: DataUniversidadesProvider,
    public storage: Storage) {
      this.info_universidad_agregar = {};
      this.university_levels = [{id:0, title:"Ambas"},{id:1, title:"Profesional"},{id:2,title:"Técnica"}];
      // Extraemos token del usuario
      this.storage.get("user").then((data) => {
        this.token = data.token
        this.load_types()
    })
  }

  async load_types() {
    this.university_types =  await this.provider_universidades.get_types()
  }

  agregar_universidad() {
    /* crear_universidad: funcion para crear la informacion de una de 
    lcas universidades. Lo que hace es ordenar la data que se enviará y llama 
    a la funcion del provider */
    let data_a_enviar = {
        "title": this.info_universidad_agregar['title'],
        "website": this.info_universidad_agregar['website'],
        "motto": this.info_universidad_agregar['motto'],
        "initials": this.info_universidad_agregar['initials'],
        "freeness": this.info_universidad_agregar['freeness'],
        "foundation": this.info_universidad_agregar['foundation'],
        "postgraduates": this.info_universidad_agregar['postgraduates'],
        "doctorates": this.info_universidad_agregar['doctorates'],
        "teachers": this.info_universidad_agregar['teachers'],
        "description": this.info_universidad_agregar['description'],
        "students": this.info_universidad_agregar['students'],
        "degrees": this.info_universidad_agregar['degrees'],
        "university_type_id": this.info_universidad_agregar['university_type_id'],
        "level": this.info_universidad_agregar['level']
    };

    console.log('Data a enviar', data_a_enviar);

    this.provider_universidades.crear_universidad(data_a_enviar, this.token)
        .then(data => {
            console.log('Respuesta al crear', data);
        })
  };
}
