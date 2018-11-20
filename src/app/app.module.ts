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
import { AdvogadoPerfilPage } from '../pages/advogado-perfil/advogado-perfil';
import { PerfilPage } from '../pages/perfil/perfil';
import { LembretePage } from '../pages/lembrete/lembrete';

var config = {
  apiKey: "AIzaSyDX-VQSVtDSjR59YbVFldIRu0jipiwIEBQ",
  authDomain: "tcc-chat-e6ad0.firebaseapp.com",
  databaseURL: "https://tcc-chat-e6ad0.firebaseio.com",
  projectId: "tcc-chat-e6ad0",
  storageBucket: "",
  messagingSenderId: "871282849934"
};
firebase.initializeApp(config);
var storage = firebase.storage();

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
    TestePage,
    LembretePage

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
    TestePage,
    LembretePage

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
