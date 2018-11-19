import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { AdvogadoFeedPage } from '../advogado-feed/advogado-feed';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  
  status: string = "usuarioComum";
  usuario: string = 'Não sou advogado';
  advogado: boolean = false;
  
  novoAdvogado = {
    email: '',
    senha: '',
    confirmarSenha: '',
    nome: '',
    oab: '',
    celular:''
  }
  
  novoUsuario = {
    email: '',
    senha: '',
    confirmarSenha: '',
    nome: ''
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private usuarioService: UsuarioProvider,
    private alertCtrl: AlertController,
    ) {
      console.log(this.advogado)
      console.log(this.usuario)
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad CadastroPage');
    }
    
    firebaseUsuario = firebase.database();

    showAlert(erro) {
      const alert = this.alertCtrl.create({
        title: 'Erro!',
        subTitle: erro,
        buttons: ['OK']
      });
      alert.present();
    }
    
    criarUsuario(){
      if(this.novoUsuario.senha != this.novoUsuario.confirmarSenha){
        const erro = "As senhas não correspondem"
        this.showAlert(erro);
      }
      else if(this.novoUsuario.email == null || this.novoUsuario.nome == null){
        console.log('erro')
      }
      else{
        let loader = this.loadingCtrl.create({
          content: 'Por favor, espere um momento'
        });
        loader.present();
        firebase.auth().createUserWithEmailAndPassword(this.novoUsuario.email, this.novoUsuario.senha)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: this.novoUsuario.nome,
            photoURL: '',
          }).then(() => {
            this.firebaseUsuario.ref('usuario/'+firebase.auth().currentUser.uid).set({
              uid: firebase.auth().currentUser.uid,
              displayName: this.novoUsuario.nome,
              email: this.novoUsuario.email
            }).then(() =>{
              loader.dismiss();
              console.log('salvo no banco')
              this.navCtrl.push(HomePage)
            }).catch(() => {
              loader.dismiss();
              console.log('erro');
            })
            loader.dismiss();
          }).catch(() => {
            console.log('erro')
          })
        })
      }
    }
    
    criarAdvogado(){
      if(this.novoAdvogado.senha != this.novoAdvogado.confirmarSenha){
        const erro = "As senhas não correspondem"
        this.showAlert(erro)
      }else{
        let loader = this.loadingCtrl.create({
          content: 'Por favor, espere um momento'
        });
        loader.present();
        firebase.auth().createUserWithEmailAndPassword(this.novoAdvogado.email, this.novoAdvogado.senha)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: this.novoAdvogado.nome,
            photoURL: '',
          }).then(() => {
            this.firebaseUsuario.ref('advogado/'+firebase.auth().currentUser.uid).set({
              uid: firebase.auth().currentUser.uid,
              displayName: this.novoAdvogado.nome,
              email: this.novoAdvogado.email
            }).then(() =>{
              loader.dismiss();
              console.log('salvo no banco')
              this.navCtrl.push(AdvogadoFeedPage)
            }).catch(() => {
              loader.dismiss();
              console.log('erro');
            })
            loader.dismiss();
          }).catch(() => {
            console.log('erro')
          })
        })
      }
    }
    
    
    
    hide() {
      if(this.advogado == true){
        this.advogado = false;
        this.usuario = "Não sou advogado"
        
      }
      else{ 
        this.advogado = true 
        this.usuario = "Não sou advogado"
      }
    }
    
  }
  