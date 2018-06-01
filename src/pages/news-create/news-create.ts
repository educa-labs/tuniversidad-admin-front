import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NewsProvider } from '../../providers/news/news'


@Component({
  selector: 'page-news-create',
  templateUrl: 'news-create.html',
})
export class NewsCreatePage {

  newData: object;
  token:  string;
  imageToUpload: File = null;

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

  handleImageInput(files: FileList) {
    this.imageToUpload = files.item(0);
  }

  async create(){
    const payload = { 
      new: this.newData
    }

    if (this.imageToUpload) {
      const data = await this.readUploadedFileAsData(this.imageToUpload)
      const result =JSON.stringify(data).slice(1,-1)
      payload['picture'] = result.split('base64,').pop();
      payload['extension'] = this.imageToUpload.name.split('.').pop()
    }

    console.log("payload", payload)
    this.newProvider.createNew(payload, this.token)
        .then(data => {
          console.log('Respuesta al crear', data);
    })
  }

  readUploadedFileAsData = (file) => {
    const reader:FileReader = new FileReader();

    return new Promise((resolve,reject) => {
      reader.onloadend = (e) => {
        resolve(reader.result)
      }
      reader.readAsDataURL(file);    
      }
    )
  };

}
