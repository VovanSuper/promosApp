import { Component, EventEmitter, Output } from '@angular/core';
import { NavController, ToastController, Alert, AlertController } from 'ionic-angular';
import { LoginResponse } from '../../models/login/loginResponse.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { Account } from '../../models/account/account.interface';
import firebase from 'firebase';
import { FormularioPage } from '../../pages/formulario/formulario';



/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-form',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  account = {} as Account;

  /* Lo contrario que el input...Ahora el componente Login pasará información al padre...(En vez de recibir
  como con el imput...pasará un EventEmitter con la respuesta (result para satisfactoria y error para negativa)) */
  @Output() loginStatus: EventEmitter<LoginResponse>;


  constructor(public auth: AuthProvider, private navCtrl: NavController, private toast: ToastController,
    private alertCtrl: AlertController) {
    //Hay que instanciarlo, ya que al tener el decorator output no lo hemos podido poner en el constructor
    this.loginStatus = new EventEmitter<LoginResponse>();
  }

  async login() {
    try {
      const resultado = await this.auth.login(this.account);
      this.loginStatus.emit(resultado);

    }

    catch (e) {
      this.loginStatus.emit(e);

    }

  }

  async loginWithFacebook() {
    try {
      const resultado = await this.auth.facebookLogin();
      this.navCtrl.setRoot('MenuPage');
    }

    catch (e) {
      this.toast.create({
        /* Ver uso de template literal strings  */
        message: 'Error de autenticación. Compruebe que su dispositivo dispone de la app de Facebook activa con su usuario',
        duration: 3000
      }).present();
    }
  }


  loginWithGoogle() {

    if (this.auth.googleLogin()) {
      this.navCtrl.setRoot('MenuPage');
    } else {
      this.toast.create({
        /* Ver uso de template literal strings  */
        message: 'Error de autenticación. Compruebe que sus datos y conexión.',
        duration: 3000
      }).present();
    }
  }





  NavigateToPageRegister(page: string) {
    this.navCtrl.push('RegisterPage');
  }


  resetPassword(email: string): Promise<void> {
    if (!email || email == "") {
      this.toast.create({
        /* Ver uso de template literal strings  */
        message: 'Debe rellenar su e-mail para resetear su contraseña',
        duration: 4000
      }).present();
    }

    else {
      return firebase.auth().sendPasswordResetEmail(email).then
        (
        user => {
          const alert = this.alertCtrl.create({
            message: "Comprueba tu bandeja de entrada para resetear la contraseña",
            buttons: [
              {
                text: "Ok",
                role: "cancel",
                handler: () => {

                }
              }
            ]
          });
          alert.present();
        },
        error => {
          const errorAlert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role: "cancel" }]
          });
          errorAlert.present();
        }
        );

    }
  }

  uploadPromotion(){
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.presentAlert('Información','Por favor inicie sesión para continuar');
        unsubscribe();
      } else {
        this.navCtrl.push(FormularioPage);
      }
  });
}


  presentAlert(titulo:string,contenido:string) {
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: contenido,
      buttons: ['OK']
    });
    alert.present();
  }



}
