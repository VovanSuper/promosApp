import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShareProvider {

  constructor(private socialSharing:SocialSharing) {
    console.log('Hello ShareProvider Provider');
  }


  
twitterShare(msg,image){
  this.socialSharing.shareViaTwitter(msg + "\n Sent from my Awesome App !", image, 'http://ilovealcazar.es/');
}

whatsappShare(msg,image){
  this.socialSharing.shareViaWhatsApp(msg + "\n Sent from my Awesome App !",image, 'http://ilovealcazar.es/');
 }

 
facebookShare(msg,image){
 this.socialSharing.shareViaFacebook(msg + "\n Sent from my Awesome App !", image, 'http://ilovealcazar.es/');
 }

 shareViaInstagram(msg,image){
 this.socialSharing.shareViaInstagram(msg + "\n Sent from my Awesome App !", image);

}

}