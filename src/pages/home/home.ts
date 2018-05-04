import { Component,ViewChild } from '@angular/core';
import { NavController,Slides,ToastController, IonicPage} from 'ionic-angular';
import * as WC from 'woocommerce-api'; //Importamos librería completa
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  imgs:any[]=[];
  Woocommerce:any;
  products:any[];
  moreProductos:any[];
  page:number;

  /*Vamos a acceder a un componente del html (productSlides)..Lo hacemos a través del ViewChild,
  que nos permite acceder a "hijos" de nuestra página .ts...Hijos serían por ejemplo los elementos del html
  (Recordar que en el html tendremos que darle una identificación ---> #productSlides) */

 // @ViewChild('productSlides') productSlides:Slides;

  
  constructor(public navCtrl: NavController,private toast:ToastController) {

    //Imágenes para slider principal
    this.imgs=[1,2];
    
   

    //WC takes a Json object as a parameter
    this.Woocommerce=WC({
      url:'http://ilovealcazar.es',
      //Claves obtenidas en Woocommerce generate api de nuestra tienda
      consumerKey:'ck_73f316a4eb61a9deb956fcf8601f2e65b0c15345',
      consumerSecret:'cs_c111d10d2af21c1394df780d4c8b79e4e8607996'
    });

    //Coger productos para mostrarlos en el slider
    //El primer parámetro indica lo que estamos importando (productos)
    //Installar en google chrome la extensión allow-control allow-origin para que no de problema al solicitar desde localhost
    this.Woocommerce.getAsync('products').then((data)=>{
     //Los productos están guardados en Data--->Body..> products
     //Aquí usaremos JSON.parse, poruqe al contrario que con los Observables, no podemos mapear las promises
     console.log(JSON.parse(data.body));
     //Cada carga coge 10 productos, 1 página
     this.products=JSON.parse(data.body).products;
    }).catch((error)=> console.log("Error cogiendo productos " + error.message));

    this.loadMoreProducts(null); //Para que se rellene el array de more products
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

  loadMoreProducts(event){

    if(event == null){
      console.log("Con evento nulo, debería hacer fetch de los productos de la página 2");
      this.page=2; //Como sabemos se le puede indicar de qué página coger los productos
      //Al inicializar (constructor), que carge los 10 primeros en el slider + 10 después en vista
      this.moreProductos=[];
      //Obviamente, si estamos arriba, sólo queremeos que muestre los 10 primeros..Por lo que
      //dejamos array vacío + añadimos 10 productos
    }

    //El resto en el infinite, que simplemente irá sumando una página cada vez que se produzca el evento...
    //Además, irá sumando al array actual (push) para que vayan apareciendo todos, y los anteriores no se borren
    else{
      this.page++;
      console.log("Evento no nulo");
    }
    
      this.Woocommerce.getAsync('products?page=' + this.page).then((data)=>{
        let prodAux=JSON.parse(data.body).products;
        for(var i=0;i<prodAux.length;i++){
          console.log(prodAux[i]);
          this.moreProductos.push(prodAux[i]);
        }
      
      console.log("Productos segunda página cogidos... + "+ this.moreProductos.length);
    
  

  //Tenemos que indicar a Angular que ya debemos terminar la tarea asociada al evento recibido

  if(event != null){
    event.complete();
  }

  //Si cogemos de una tirada, menos de 10 productos, significará que hemos llegado al final

  if ( JSON.parse(data.body).products.length < 10){
    console.log("Ya no hay más productos")
    event.enable(false); //Disable infinite scroll
   }

   }).catch((error)=> console.log("Error cogiendo productos " + error.message));
}


openProductPage(product){
  this.navCtrl.push('ProductDetailsPage',{'product':product});
}

share(){

}

uploadPromotion(){
  this.navCtrl.push('FormularioPage');
}
}
