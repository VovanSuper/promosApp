import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { ImageProvider } from '../../providers/image/image';
import { EmailProvider } from '../../providers/email/email';



/**
 * Generated class for the FormularioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'formulario-component',
  templateUrl: 'formulario.html'
})
export class FormularioComponent {

  

  public Emailform: FormGroup;
  private attachment1: any = null;
  private attachment2: any = null;
  private attachment3: any = null;
  attachmentArray: any[];

  constructor(private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private ImageService: ImageProvider,
    private EmailService: EmailProvider,
    private AlertService: AlertController,
    private platform:Platform) {

    this.attachmentArray = [this.attachment1, this.attachment2, this.attachment3];


    this.Emailform = this.formBuilder.group({
      "email": ["", Validators.required],
      "empresa": ["", Validators.required],
      "telefono": ["", Validators.required],
      "direccion": ["", Validators.required],
      "descripcion_corta": ["", Validators.required],
      "descripcion_larga": ["", Validators.required]
    });
  }

  displayMessage(title: string, subTitle: string): void {
    let alert: any = this.AlertService.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

ionViewWillLoad(){
  this.attachmentArray=[];
}

  retrieveAttachment(): void {
    this.platform.ready().then(()=>{
      var haySitio = false;
      this.ImageService.selectPhotograph()
        .then((attachment: any) => {
          // Assign retrieved image to private property
          // which we'll subsequently access within the
          // sendMessage method
          for (var i = 0; i < this.attachmentArray.length; i++) {
            if (!this.attachmentArray[i] || !this.attachmentArray[i] == null) {
              haySitio = true;
             /* for(var e=0;e<attachment.length;e++){
                this.attachmentArray[i]+=attachment[e];
                if(attachment[e] ==="?"){
                  this.attachmentArray=this.attachmentArray[i].replace(/\?/g,'');
                  this.attachmentArray[i].trim();
                  break;
                }

              }

              */
              this.attachmentArray[i] = attachment;
              console.log("Esto tiene la imagen ") + attachment;
              break;
            }
          }
  
          if (!haySitio) {
            this.displayMessage('Información', 'Sólo puede adjutar 3 imágenes');
            for(let attach of this.attachmentArray){
              console.log(attach);
            }
          }
  
  
        });
    });
  
  }

  volver() {
    this.navCtrl.pop();
  }

  sendMessage(): void {
    // Retrieve the validated form fields
    let to: string = 'comercial@ilovealcazar.com',
      cc: string = 'davidapuntes@hotmail.com',
      subject: string = 'Nueva Promoción',
      message: string = " Email origen: " + this.Emailform.controls["email"].value + "/n" +
      + " Negocio: " + this.Emailform.controls["empresa"].value  + "/n" +
      + " Teléfono: " + this.Emailform.controls["telefono"].value + "/n" +
      + " Dirección: " + this.Emailform.controls["direccion"].value + "/n" +
      + " Descripcion corta: " + this.Emailform.controls["descripcion_corta"].value + "/n" +
      + " Dirección: " + this.Emailform.controls["descripcion_larga"].value + "/n" 


    // Has the user selected an attachment?
    if (this.attachmentArray.length == 1) {
      // If so call the sendEmail method of the EmailProvider service, pass in
      // the retrieved form data and watch the magic happen! :)
      this.EmailService.sendEmail(to, cc, subject, message, this.attachment1);
      this.attachmentArray=[];
    }

    else if (this.attachmentArray.length == 2) {

      this.EmailService.sendEmail(to, cc, subject, message, this.attachment1, this.attachment2);
      this.attachmentArray=[];
    }
    else if (this.attachmentArray.length == 3) {

      this.EmailService.sendEmail(to, cc, subject, message, this.attachment1, this.attachment2, this.attachment3);
      this.attachmentArray=[];
    }



    else {
      // Inform the user that they need to add an attachment
      this.displayMessage('Error', 'Adjunte al menos una fotografía para la promoción');
    }
  }


}


