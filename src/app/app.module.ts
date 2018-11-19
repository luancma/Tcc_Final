import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import firebase from 'firebase'
import { HttpClientModule } from '@angular/common/http'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser'
import { Camera } from '@ionic-native/camera';
import { FCM } from '@ionic-native/fcm';
import { TestePage } from '../pages/teste/teste';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { AdvogadoFeedPage } from '../pages/advogado-feed/advogado-feed';
import { PortalPage } from '../pages/portal/portal';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { LoginPage } from '../pages/login/login';
import { UsuarioProvider } from '../providers/usuario/usuario';

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
    HomePage,
    LoginPage,
    CadastroPage,
    PortalPage,
    AdvogadoFeedPage,
    RecuperarSenhaPage,
    EditarPerfilPage,
    TestePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CadastroPage,
    PortalPage,
    AdvogadoFeedPage,
    RecuperarSenhaPage,
    EditarPerfilPage,
    TestePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera, 
    FCM,
    File,
    FilePath,
    FileChooser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider
  ]
})
export class AppModule {}
