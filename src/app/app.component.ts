import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { PortalPage } from '../pages/portal/portal';
import { PerfilPage } from '../pages/perfil/perfil';
import { TestePage } from '../pages/teste/teste';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TestePage
  @ViewChild(Nav) nav: Nav;

  pages: Array <{title: string, component: any}>

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
      this.initializeApp();
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Chat', component: PortalPage },
        { title: 'Perfil', component: PerfilPage}
      ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

