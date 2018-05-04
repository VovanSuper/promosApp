import { Component } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa


/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  product: any;
  Woocommerce: any;
  reviews: any[]=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.get('product');
    console.log(this.product);

    this.Woocommerce = WC({
      url: 'http://ilovealcazar.es',
      consumerKey: 'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret: 'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });

    //Vamos a coger las reviews u opiniones que tenga cada producto
    this.Woocommerce.getAsync('products/' + this.product.id + '/reviews').then((data) => {
      this.reviews = (JSON.parse(data.body).product_reviews);
      console.log(this.reviews);
    }).catch((error) => console.log("Error cogiendo reviews " + error.message));


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  uploadPromotion(){
    this.navCtrl.push('FormularioPage');
  }

}
