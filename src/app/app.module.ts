import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';





const config = {
  apiKey: "AIzaSyDWuh4kMKL8QcOaExZKS8UemDAwzK_7YpQ",
  authDomain: "promosapp-f65a4.firebaseapp.com",
  databaseURL: "https://promosapp-f65a4.firebaseio.com",
  projectId: "promosapp-f65a4",
  storageBucket: "promosapp-f65a4.appspot.com",
  messagingSenderId: "302191716332"
};


@NgModule({
  declarations: [
    MyApp,   
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, 

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    GooglePlus,
    
  ]
})
export class AppModule {}
