import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/loginResponse.interface';
import { Facebook } from '@ionic-native/facebook'
import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user: Observable<firebase.User>;


  constructor(private auth:AngularFireAuth,
    private facebook:Facebook,
    private gplus: GooglePlus,
    private platform: Platform) {

    firebase.auth().useDeviceLanguage();
    this.user = this.auth.authState;
  }

  googleLogin():boolean {
    //Comprobamos si está siendo ejecutada en un móvil (platform cordova-nativo, o no)
    try{
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
      return true;
    } else {
      this.webGoogleLogin();
      return true;
    }

  }catch(e){
    return false;
    
  }
  }


  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.auth.auth.signInWithPopup(provider);
  
    } catch(err) {
      console.log(err)
    }
  
  }

  signOut() {
    this.auth.auth.signOut();
  }

  async nativeGoogleLogin(): Promise<void> {
    try {
      //take the token first.....
      const gplusUser = await this.gplus.login({
        'webClientId': 'AIzaSyDQHxQpmu7CWRoAeI6gEYhi7ixQd69W-a4',
        'offline': true,
        'scopes': 'profile email'
      })
      //lo enviamos
      return await this.auth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
  
    } catch(err) {
      console.log(err)
    }
  }
  

  getAuthenticatedUser(){
   return this.auth.authState; //Devuelve Observable de tipo User
  }


  //Función de logeo
  async login(account:Account){
    try{
      return <LoginResponse> {
        result:await this.auth.auth.signInWithEmailAndPassword(account.email,account.password)
      } 
               
    }catch(e){
          
      return <LoginResponse>{
        error:e
      }
         
    }
  }

  //Recordamos que async permitía ingresar el resultado de una promise directamente en la variable, con el await,
  //sin tener que hacer then=>

  //Devolverá un objeto LoginResponse, relleno con su respectivo subobjeto según el resultado

  //Función de registro
  async createUserWithEmailAndPassword(account:Account){
    try{
      return <LoginResponse> {
        result:await this.auth.auth.createUserWithEmailAndPassword(account.email,account.password)
    }
    }catch(e){
      return <LoginResponse>{
        error:e
      }
    }
   

}




facebookLogin(): Promise<any> {
  return this.facebook.login(['email'])
    .then( response => {
      //Creamos objeto con las credenciales del usuario de facebook
      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);
      //Se las pasamos a firebase
      firebase.auth().signInWithCredential(facebookCredential)
        .then( success => { 
          console.log("Firebase success: " + JSON.stringify(success)); 
        });

    }).catch((error) => { console.log(error) });
}




}