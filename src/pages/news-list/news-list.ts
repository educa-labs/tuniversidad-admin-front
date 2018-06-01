import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news'
import { NewsCreatePage} from '../../pages/news-create/news-create'

@Component({
  selector: 'page-news-list',
  templateUrl: 'news-list.html',
})
export class NewsListPage {

  news: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public newsProvider: NewsProvider) {
      this.loadNews()
  }


  async loadNews() {
    this.news = await this.newsProvider.getNews()
  }

  addNew(){
    this.navCtrl.push(NewsCreatePage)
  }

}
