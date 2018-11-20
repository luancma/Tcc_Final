import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { AdvogadoFeedPage } from '../advogado-feed/advogado-feed';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  
  registerFormCliente: FormGroup
  registerFormAdvogado: FormGroup
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public formbuilder: FormBuilder) {
      console.log(this.advogado)
      console.log(this.usuario)
      
      
      this.registerFormCliente = this.formbuilder.group({
        nomeCompleto: [null, [Validators.required, Validators.minLength(6)]],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required, Validators.minLength(6)]],
        repetirSenha: [null, [Validators.required, Validators.minLength(6)]],
        telefone: [null, [Validators.required, Validators.minLength(11)]],
      })
      
      this.registerFormAdvogado = this.formbuilder.group({
        nomeCompleto_adv: [null, [Validators.required, Validators.minLength(6)]],
        oab_adv: [null, [Validators.required, Validators.minLength(5)]],
        email_adv: [null, [Validators.required, Validators.email]],
        senha_adv: [null, [Validators.required, Validators.minLength(6)]],
        repetirSenha_adv: [null, [Validators.required, Validators.minLength(6)]],
        telefone_adv: [null, [Validators.required, Validators.minLength(11)]],
      })
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
        let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
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
              console.log('salvo no banco')
              this.navCtrl.setRoot(LoginPage)
              toast.setMessage('Usuário criado com sucesso')
              toast.present();  
            }).catch(() => {
              console.log('erro 1');
            })
          }).catch(() => {
            console.log('erro 2')
            
          })
        }).catch((error) => {
          if(error.code == 'auth/invalid-email'){
            toast.setMessage("Email ou senha invádlido");
          }else if(error.code ='auth/user-disabled'){
            toast.setMessage("Email já cadastrado!");
          }else if(error.code == 'auth/user-not-found'){
            toast.setMessage("Usuário não encontrado");
          }else if(error.code =='auth/wrong-password '){
            toast.setMessage("Usuário ou senha incorreto");
          }
          else if(error.code == 'auth/invalid-user-token'){
            toast.setMessage("Email já cadastrado!")
          }
          toast.present();
        })
      }
    }
    
    criarAdvogado(){
      let toastAdvogado = this.toastCtrl.create({duration: 6000, position: 'bottom'})
      if(this.novoAdvogado.senha != this.novoAdvogado.confirmarSenha){
        const erro = "As senhas não correspondem"
        this.showAlert(erro)
      }else{
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
              
              console.log('salvo no banco')
              this.navCtrl.setRoot(LoginPage)
            }).catch(() => {
              
              console.log('erro');
            })
            
          }).catch(() => {
            console.log('erro')
          })
        }).catch((error) => {
          if(error.code == 'auth/invalid-email'){
            toastAdvogado.setMessage("Email ou senha invádlido");
          }else if(error.code ='auth/user-disabled'){
            toastAdvogado.setMessage("Email já cadastrado!");
          }else if(error.code == 'auth/user-not-found'){
            toastAdvogado.setMessage("Usuário não encontrado");
          }else if(error.code =='auth/wrong-password '){
            toastAdvogado.setMessage("Usuário ou senha incorreto");
          }
          else if(error.code == 'auth/invalid-user-token'){
            toastAdvogado.setMessage("Email já cadastrado!")
          }
          toastAdvogado.present();
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

  voltar(){
    this.navCtrl.pop();
  }
  
}
