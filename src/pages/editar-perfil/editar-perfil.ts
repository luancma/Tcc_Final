import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { PerfilPage } from '../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {
  uid:string;
  nomeDeUsuario: string = null;
  telefoneUsuario:string = null;
  usuario: any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController) {
      let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
      this.getUsuario();
      
    }
    
    getUsuario = () => {
      this.usuario= [];
      this.uid = firebase.auth().currentUser.uid;
      console.log(this.uid);
      let query = firebase.firestore().collection("usuarios").doc(this.uid);
      query.get().then(doc => { 
        this.usuario = doc.data();
        console.log(this.usuario.displayName);
      }).catch((erro) => {
        console.log(erro);
      })
    }
    
    atualizarDados(){
      
      if(this.nomeDeUsuario && this.telefoneUsuario !== null ){
        this.atualziarNomeTelefone();  
      }else if(this.nomeDeUsuario !== null && this.telefoneUsuario == null){
        this.atualizarNome();
      }else if(this.nomeDeUsuario == null && this.telefoneUsuario !== null){
        this.atualizarCelular();
      }
      else{
        let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
        toast.setMessage("Preencha um dos campos para poder realizar as modificações");
        toast.present()
      }
    }

    atualizarNome(){
      let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
      this.uid = firebase.auth().currentUser.uid;
      var usuario = firebase.firestore().collection('usuarios').doc(this.usuario.uid);
      // Set the 'capital' field of the city
      var updateSingle = usuario.update({ displayName: this.nomeDeUsuario });
      toast.setMessage("Seu nome de usuário foi atualizado com sucesso");
      toast.present()
      this.navCtrl.push(PerfilPage)
    }

    atualizarCelular(){
      let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
      this.uid = firebase.auth().currentUser.uid;
      var usuario = firebase.firestore().collection('usuarios').doc(this.usuario.uid);
      // Set the 'capital' field of the city
      var updateSingle = usuario.update({ celular: this.telefoneUsuario });
      toast.setMessage("Seu número de celular foi atualizado com sucesso");
      toast.present()
      this.navCtrl.push(PerfilPage)
    }
    atualziarNomeTelefone(){
      let toast = this.toastCtrl.create({duration: 6000, position: 'bottom'});
      this.uid = firebase.auth().currentUser.uid;
        var usuario = firebase.firestore().collection('usuarios').doc(this.usuario.uid);
        // Set the 'capital' field of the city
        var updateSingle = usuario.update({ displayName: this.nomeDeUsuario, celular: this.telefoneUsuario });
        toast.setMessage("Seus dados foram atualizados com sucesso");
        toast.present()
        this.navCtrl.push(PerfilPage);
    }
  }
  