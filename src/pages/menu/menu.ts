import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,IonicPage } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa
import 'rxjs/add/operator/map';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage:any;
  Woocommerce:any;
  categories:any[];
  iconos:any[];
  //Recordar que con el viewChild podíamos acceder al html desde el ts
  //Aquí estamos acciendo al nav-bar
  @ViewChild('content') childController: NavController;

  //A través del OpenCatPage() cambiamos la root Page establecida en el ion nav

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.homePage='HomePage';    

    this.categories=[];

    //Esto lo hago "a pelo, según el número de categorías"
    this.iconos=['beer','pizza','bicycle','briefcase','cafe'];

    this.Woocommerce=WC({
      url:'http://ilovealcazar.es',
      //Claves obtenidas en Woocommerce generate api de nuestra tienda
      consumerKey:'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret:'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });

    let catTemporales:any[];
    //Cogeremos las categorías para que sean mostradas en nuestro menú
    this.Woocommerce.getAsync('products/categories').then((data)=>{
      catTemporales=JSON.parse(data.body).product_categories;
      //Solo queremos mostrar las categorías padre, es decir que tengan atributo parent vacio (cero)
      for(var i=0;i<catTemporales.length;i++){
        if(catTemporales[i].parent===0){
          this.categories.push(catTemporales[i]);
        }
      }
      console.log("Cogidas " + this.categories.length + " categorías padre");
     }).catch((error)=> console.log("Error cogiendo categorías " + error.message));
  
  }
  

  openCatPage(category){
    this.childController.setRoot('ProductosPCategoriaPage',{'category':category});
    console.log("abriendo página de categoría ... " + category.slug);
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

 
  

 
}