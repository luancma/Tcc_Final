import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ActionSheetController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import firebase, { database, firestore } from 'firebase';
import * as admin from "firebase";

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  
  duvida: any = {};
  mensagens: any[] = [];
  mensagemChat: string = "";   
  tamanho: number;
  igualId: boolean = true;
  validaChat:any [] = [];
  key: string = '';
  arrayKey: any [] = [];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController, 
    private toastCtrl: ToastController) {
      
      
      let uid = firebase.auth().currentUser.uid
      console.log(`ID DO USUARIOS : " + ${uid}`)
      this.duvida = this.navParams.get("duvida");
      
      if(uid == this.duvida.uidUsuario){
        this.igualId == true;
        console.log(`O ID DA DUVIDA É : ${this.duvida.uidUsuario}`);
      }else{
        this.igualId == false;
      }
      
      this.getMensagem()
    }
    
    enviarMensagem(duvida){
      let query = firebase.database().ref('chat-list/' + this.duvida.postId).push()
      query.set({
        text: this.mensagemChat, 
        uid: firebase.auth().currentUser.uid,
        usuarioNome: firebase.auth().currentUser.displayName  
      }).then(() => {
        this.toastCtrl.create({
          message: "Mensagem enviada",
          duration: 3000
        }).present(); 
        this.getMensagem();
        this.mensagemChat = "";
      }).catch((erro) =>{
        this.toastCtrl.create({
          message: erro.message,
          duration: 3000
        }).present();
      })
    }
    
    getMensagem(){
      firebase.database().ref('chat-list/'+ this.duvida.postId).once('value', ((docs) =>{
        docs.forEach((doc) =>{
          this.validaChat.push(doc.val())
          console.log('CHEGOU AQUI')
        })
        console.log(this.
          validaChat.length)
        if(this.
          validaChat.length !== 0 ) {
          firebase.database().ref('chat-list').child(this.duvida.postId).limitToFirst(this.validaChat.length)
          .once('value', ((docs) => {
            docs.forEach((doc) => {
              this.mensagens.push(doc.val())
            })
            console.log(this.mensagens)
          }))
        }
      }))
    }
    
    atualizarConversa(){
      let query= firebase.database().ref('chat-list').child(this.duvida.postId)
      query.once('value', ((docs) => {
        docs.forEach((doc) => {
          this.mensagens.push(doc.key)
        })
        let valor = this.mensagens.length -1;
        console.log(valor)
        query.child(`${valor}`).once('value', ((docs) => {
          docs.forEach((doc) => {
            console.log(doc.val())
          })
        }))
      }))

    }
      
    
  }
  
  
  