import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class NewsProvider {

  api: string = 'http://localhost:3000';
  
  constructor(public http: Http, public loading: LoadingController) {
    
  }
  createNew(newData,token) {
    let loader = this.loading.create({ content: 'Creando noticia...' });
    // Mostrar loader
   loader.present();
   return new Promise(resolve => {
       // Headers para hacer la consulta
       let headers = new Headers();

       headers.append('Authorization', token);
       headers.append('Content-Type', 'application/json');
       // Hacer post a la API
       this.http.post(this.api + '/news/', JSON.stringify(newData), { headers: headers })
           .map(res => res.json())
           .subscribe(data => {
               resolve(data);
               loader.dismiss();
           })
   })
}

}
