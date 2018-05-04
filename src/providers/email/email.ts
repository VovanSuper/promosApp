import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';


@Injectable()
export class EmailProvider {

  constructor(private _EMAIL: EmailComposer) { }

  sendEmail(to: string,
    cc: string,
    subject: string,
    body: string,
    attachment_1?: string,
    attachment_2?: string,
    attachment_3?: string,): void {
    // Use the plugin isAvailable method to check whether
    // the user has configured an email account
    this._EMAIL.isAvailable()
      .then((available: boolean) => {

        // Check that plugin has been granted access permissions to
        // user's e-mail account
        this._EMAIL.hasPermission()
          .then((isPermitted: boolean) => {

            // Define an object containing the
            // keys/values for populating the device
            // default mail fields when a new message
            // is created
            let email: any = {
              app: 'mailto',
              to: to,
              cc: cc,
              attachments: [
                attachment_1,
                attachment_2,
                attachment_3

              ],
              subject: subject,
              body: body
            };

            // Open the device e-mail client and create
            // a new e-mail message populated with the
            // object containing our message data
            this._EMAIL.open(email);
          })
          .catch((error: any) => {
            console.log('No access permission granted');
            console.dir(error);
          });
      })
      .catch((error: any) => {
        console.log('User does not appear to have device e-mail account');
        console.dir(error);
      });
  }

}
