import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NewsProvider } from '../../providers/news/news'
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-news-show',
  templateUrl: 'news-show.html',
})
export class NewsShowPage {

  newData: any;
  token:  string;
  imageToUpload: File = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public newProvider: NewsProvider,
    public alertCtrl: AlertController) {
      this.newData = {}
      // Extraemos token del usuario
      this.storage.get("user").then((data) => {
        this.token = data.token
      })
      this.loadNew(navParams.get('newId'))
  }


  loadNew(newId) {
    this.newProvider.getNew(newId).then( data => {
      this.newData = data
      console.log(this.newData)
    })
  }


  destroyNew(){
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
            this.newProvider.deleteNew(this.navParams.get('newId'), this.token)
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
  }


  handleImageInput(files: FileList) {
    this.imageToUpload = files.item(0);
  }  

  async update(){
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
    this.newProvider.updateNew(this.navParams.get('newId'),payload, this.token)
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
