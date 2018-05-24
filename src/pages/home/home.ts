import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, IonicPage } from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa
import 'rxjs/add/operator/map';
import { ShareProvider } from '../../providers/share/share';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imgs: any[] = [];
  Woocommerce: any;
  moreProductos: any[];
  page: number;

  /*Vamos a acceder a un componente del html (productSlides)..Lo hacemos a través del ViewChild,
  que nos permite acceder a "hijos" de nuestra página .ts...Hijos serían por ejemplo los elementos del html
  (Recordar que en el html tendremos que darle una identificación ---> #productSlides) */

  // @ViewChild('productSlides') productSlides:Slides;


  constructor(public navCtrl: NavController,
    private toast: ToastController,
    public shareProv: ShareProvider) {

    //Imágenes para slider principal
    this.moreProductos = [];
    this.imgs = [1, 2];
    this.page = 1;

    //WC takes a Json object as a parameter
    this.Woocommerce = WC({
      url: 'http://ilovealcazar.es',
      //Claves obtenidas en Woocommerce generate api de nuestra tienda
      consumerKey: 'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret: 'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });

    //Coger productos para mostrarlos en el slider
    //El primer parámetro indica lo que estamos importando (productos)
    //Installar en google chrome la extensión allow-control allow-origin para que no de problema al solicitar desde localhost
    this.Woocommerce.getAsync('products').then((data) => {
      //Los productos están guardados en Data--->Body..> products
      //Aquí usaremos JSON.parse, poruqe al contrario que con los Observables, no podemos mapear las promises
      console.log(JSON.parse(data.body));
      //Cada carga coge 10 productos, 1 página
      this.moreProductos = JSON.parse(data.body).products;
    }).catch((error) => console.log("Error cogiendo productos " + error.message));

   
  }

  /*
  ionViewDidEnter(){
    //Programamos el autoplay de los slider que no funciona

    setInterval(()=>{
      //Cuando llegue al último, que vuelva

      if(this.productSlides.getActiveIndex() === (this.productSlides.length() -1)){
        this.productSlides.slideTo(0);
      }
      this.productSlides.slideNext();
    },3000);
  }

  */

  loadMoreProducts(event) {
    this.page++;
    console.log("Evento no nulo");
    this.Woocommerce.getAsync('products?page=' + this.page).then((data) => {
      let prodAux = JSON.parse(data.body).products;
      for (var i = 0; i < prodAux.length; i++) {
        console.log(prodAux[i]);
        this.moreProductos.push(prodAux[i]);
      }

      console.log("Productos segunda página cogidos... + " + this.moreProductos.length);
      //Tenemos que indicar a Angular que ya debemos terminar la tarea asociada al evento recibido

      event.complete();


      //Si cogemos de una tirada, menos de 10 productos, significará que hemos llegado al final

      if (prodAux < 10) {
        console.log("Ya no hay más productos")
        event.enable(false); //Disable infinite scroll
      }

    }).catch((error) => console.log("Error cogiendo productos " + error.message));
  }


  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', { 'product': product });
  }

  share() {

  }

  uploadPromotion() {
    this.navCtrl.push('FormularioPage');
  }
}
