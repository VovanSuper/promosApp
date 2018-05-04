import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa


/**
 * Generated class for the ProductosPCategoriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productos-p-categoria',
  templateUrl: 'productos-p-categoria.html',
})
export class ProductosPCategoriaPage {
  Woocommerce: any;
  productos: any[];
  page: number;
  category: any;
  moreProductos: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController) {

    this.page = 1;
    this.category = this.navParams.get('category');
    this.moreProductos = [];

    this.Woocommerce = WC({
      url: 'http://ilovealcazar.es',
      consumerKey: 'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret: 'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });

    //En woocommerce puede haber 2 categorías con el mismo nombre, pero NO con el mismo slug
    this.Woocommerce.getAsync('products?filter[category]=' + this.category.slug).then((data) => {
      console.log(JSON.parse(data.body));
      this.productos = JSON.parse(data.body).products;
    }).catch((error) => console.log("Error cogiendo productos por categoría" + error.message));


  }

  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', { 'product': product });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPCategoriaPage');
  }

  uploadPromotion(){
    this.navCtrl.push('FormularioPage');
  }

  loadMoreProducts(event) {

    this.page++;

    this.Woocommerce.getAsync('products?filter[category]=' + this.category.slug + '&page=' + this.page).then((data) => {
      let prodAux = JSON.parse(data.body).products;
      for (var i = 0; i < prodAux.length; i++) {
        this.moreProductos.push(prodAux[i]);
      }

      event.complete();


      if (prodAux.length < 10) {
        event.enable(false); //Disable infinite scroll
      }

    }).catch((error) => console.log("Error cogiendo productos " + error.message));
  }

}
