import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class NewsProvider {

  api: string = 'http://localhost:3000';
  
  constructor(public http: Http, public loading: LoadingController) {
    
  }

}
