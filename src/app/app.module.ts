import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser'
import { Camera } from '@ionic-native/camera';
import { FCM } from '@ionic-native/fcm';

var config = {
  apiKey: "AIzaSyACkuMYVbdYFa5C0MAyWsOCiiBFA2GiUcU",
  authDomain: "chatyoutb.firebaseapp.com",
  databaseURL: "https://chatyoutb.firebaseio.com",
  projectId: "chatyoutb",
  storageBucket: "chatyoutb.appspot.com",
  messagingSenderId: "561760823491"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera, 
    FCM,
    File,
    FilePath,
    FileChooser,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
