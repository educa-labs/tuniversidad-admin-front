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

  getNews() {
    let loader = this.loading.create({ content: 'Cargando noticias...' });
    // Mostrar loader
    loader.present();
    return new Promise(resolve => {
      // Headers para hacer la consulta
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // Hacer post a la API
      this.http.get(this.api + '/news/')
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
            loader.dismiss();
          })
      })
    }

  getNew(newId) {
    let loader = this.loading.create({ content: 'Cargando noticias...' });
    // Mostrar loader
    loader.present();
    return new Promise(resolve => {
      // Headers para hacer la consulta
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // Hacer post a la API
      this.http.get(this.api + '/news/'+ newId)
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
            loader.dismiss();
          })
      })
    }

  deleteNew(newId,token) {
    let loader = this.loading.create({ content: 'Eliminando carrera...' });
    loader.present();

    return new Promise(resolve => {
      // Headers para hacer la consulta
      let headers = new Headers();
      headers.append('Authorization', token);
      headers.append('Content-Type', 'application/json');

      this.http.delete(this.api + '/news/' + newId, { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log('Data recibida al borrar una noticia', data);
          loader.dismiss();
      }, error => {
          alert('Ocurrió un error al intentar borrar una noticia');
          console.log('Ocurrió un error al intentar borrar una noticia', error);
          loader.dismiss();
      });
    });  
  }
  
  updateNew(newId,newData,token) {
    let loader = this.loading.create({ content: 'Actualizando noticia...' });
    // Mostrar loader
    loader.present();
    return new Promise(resolve => {
      // Headers para hacer la consulta
      let headers = new Headers();

      headers.append('Authorization', token);
      headers.append('Content-Type', 'application/json');
      // Hacer put a la API
      this.http.put(this.api + '/news/' + newId, JSON.stringify(newData), { headers: headers })
          .map(res => res.json())
          .subscribe(data => {
            resolve(data);
            loader.dismiss();
        })
      })
    }

}
