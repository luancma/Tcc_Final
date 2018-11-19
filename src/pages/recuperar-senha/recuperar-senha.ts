import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import firebase from 'firebase';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {
  
  email: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCrtl: AlertController,
    private userService: UsuarioProvider,
    private toastCtrl: ToastController) {
      
    }
    
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad RecuperarSenhaPage');
    }
    
    recuperarEmail(){
      let toast  = this.toastCtrl.create({ duration: 3000, position: 'bottom'});
      const auth = firebase.auth();
      auth.sendPasswordResetEmail(this.email)
      .then(function() {
        toast.setMessage("Email enviado com sucesso");
        this.navCtrl.setRoot(HomePage);
      })
      .catch(function(error) {
        if(error.code == 'auth/invalid-email'){
          toast.setMessage("Email ou senha invádlido");
        }else if(error.code ='auth/user-disabled'){
          toast.setMessage("Usuário desativado");
        }else if(error.code == 'auth/user-not-found'){
          toast.setMessage("Usuário não encontrado");
        }else if(error.code =='auth/wrong-password '){
          toast.setMessage("Usuário ou senha incorreto");
        }
        toast.present();
      }); 
    }

    voltar(){
      this.navCtrl.pop();
    }
    
  }
  