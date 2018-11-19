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
  teste:any [] = []; 
  
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
      this.atualizarConversa()
    }
    enviarMensagem(duvida){
      let query = firebase.database().ref('chat-list/' + duvida.postId).push()
      query.set({
        text: this.mensagemChat, 
        uid: firebase.auth().currentUser.uid,
        usuarioNome: firebase.auth().currentUser.displayName  
      }).then(() => {
        this.toastCtrl.create({
          message: "Mensagem enviada",
          duration: 3000
        }).present(); 
        this.atualizarConversa()    
        this.mensagemChat = "";
      }).catch((erro) =>{
        this.toastCtrl.create({
          message: erro.message,
          duration: 3000
        }).present();
      })
    }
    
    getMensagem(){
      firebase.database().ref('chat-list/'+this.duvida.postId).once('value', ((docs) =>{
        docs.forEach((doc) =>{
          this.teste.push(doc.val())
        })
        console.log(this.teste.length)
        if(this.teste.length !== 0 ) {
          firebase.database().ref('chat-list/'+this.duvida.postId).limitToFirst(this.teste.length).once('value', ((docs) => {
            docs.forEach((doc) => {
              this.mensagens.push(doc.val())
            })
          }))
        }
      }))
    }

        
    // atualizarConversa(){
    //   this.mensagens = [];
    //   firebase.database().ref('chat-list/'+this.duvida.postId).once('value', ((docs) =>{
    //     docs.forEach((doc) =>{
    //       console.log(doc.val())
    //       this.mensagens.push(doc.val())
    //     })
    //     this.mensagens = this.mensagens;
    //   }))
    // }
    
    atualizarConversa(){
      // Get a database reference to our posts
      var db = admin.database();
      var ref = db.ref("chat-list/"+this.duvida.postId);  
      ref.on("child_added", function(snapshot, prevChildKey) {
        this.mensagens = (snapshot.val())

      });
    }

  }
  
  
  