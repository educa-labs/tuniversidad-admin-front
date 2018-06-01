import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NewsProvider } from '../../providers/news/news'


@Component({
  selector: 'page-news-create',
  templateUrl: 'news-create.html',
})
export class NewsCreatePage {

  newData: object;
  token:  string;
  pictureToUpload: File = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public newProvider: NewsProvider) {
      // Extraemos token del usuario
      this.newData = {};
      this.storage.get("user").then((data) => {
        this.token = data.token
      })
  }

  create(){
    const payload = { 
      new: this.newData
    }
    console.log("payload", payload)
    this.newProvider.createNew(payload, this.token)
        .then(data => {
          console.log('Respuesta al crear', data);
    })


  }

}
