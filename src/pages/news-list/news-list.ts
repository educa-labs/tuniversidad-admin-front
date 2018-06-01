import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news'
import { NewsCreatePage} from '../../pages/news-create/news-create'

@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html',
})
export class NewsListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }


  addNew(){
    this.navCtrl.push(NewsCreatePage)
  }

}
