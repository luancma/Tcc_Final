import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import firebase from 'firebase';
import { PortalPage } from '../portal/portal';
import { HomePage } from '../home/home';
import { AdvogadoFeedPage } from '../advogado-feed/advogado-feed';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { PerfilPage } from '../perfil/perfil';
import { AdvogadoPerfilPage } from '../advogado-perfil/advogado-perfil';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string = "1@advogado.com";
  senha: string = "123123"
  userId: string = "";
  idAdvogado: boolean;
  id:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
    firebase.auth().signInWithEmailAndPassword(this.email, this.senha)
    .then((usuario)=>{
      console.log(usuario);
      this.toastCtrl.create({
        message:"Bem vindo " + usuario.user.displayName,
        duration: 3000
      }).present();      
      this.userId = firebase.auth().currentUser.uid;
      console.log(this.userId);
      let refe = firebase.database().ref('advogado').child(this.userId);
      refe.once('value', ((docs) => { 
          docs.forEach((doc) => {
            this.id.push(doc.val())
          })
          console.log(this.id)
          if(docs.val() !== null){
            this.navCtrl.setRoot(AdvogadoFeedPage)
          }else
            this.navCtrl.setRoot('PerfilPage')
      })
      ).catch(erro => {
        console.log(erro)
      })
    })
    .catch((error) =>{
      if(error.code == 'auth/invalid-email'){
        toast.setMessage("Email ou senha invádlido");
      }else if(error.code ='auth/user-disabled'){
        toast.setMessage("Usuário não encontrado");
      }else if(error.code == 'auth/user-not-found'){
        toast.setMessage("Usuário não encontrado");
      }else if(error.code =='auth/wrong-password '){
        toast.setMessage("Usuário ou senha incorreto");
      }
      toast.present();
    })
  }
  cadastro = () =>{
    this.navCtrl.push(CadastroPage);
  }

  teste = () => {
    this.navCtrl.push(HomePage);
  }

  recuperarSenha = () => {
    this.navCtrl.push(RecuperarSenhaPage);
  }

}
