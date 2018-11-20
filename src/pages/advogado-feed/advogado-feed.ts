import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import firebase, { firestore } from 'firebase';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { LoginPage } from '../login/login';
import { LembretePage } from '../lembrete/lembrete';


@IonicPage()
@Component({
  selector: 'page-advogado-feed',
  templateUrl: 'advogado-feed.html',
})
export class AdvogadoFeedPage {
  text: string = "";
  duvidas: any [] = [];  
  duvidas2: any [] = [];      
  infiniteEvent: any;        
  uid: string;
  usuarioId: string;
  nomeCliente: string = '';
  usuarios:any;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private http: HttpClient) {
      
      
      this.uid = firebase.auth().currentUser.uid;
      this.getDuvidas();
    }
    
    criarLembrete(){
      this.navCtrl.push(LembretePage)
    }
    
    getUsuarioDados(){
      this.usuarios= [];
      console.log(this.usuarioId);
      firebase.database().ref("usuario/" + this.usuarioId).once('value')
      .then((docs) => {
        this.usuarios.push(docs.val())
      }) 
    }
    getDuvidas(){
      let query = firebase.database().ref('teste-advogado-cliente').child(this.uid);
      query.on('value', ((docs)=> {
        docs.forEach((doc) => {
          this.duvidas.push(doc.val());
        })
        console.log(this.duvidas[1])
        this.usuarioId = this.duvidas[2]
        console.log(this.usuarioId)
        firebase.database().ref(`duvida/${this.duvidas[2]}`).on('value', ((docs) => {
          docs.forEach((doc) => { 
            this.duvidas2.push(doc.val())
            this.duvidas2 = this.duvidas2.slice(0).reverse();
          }) 
        }))
        this.getUsuarioDados()
      }))
    }
    
    sair(){
      firebase.auth().signOut().then(() =>{
        let toast = this.toastCtrl.create({
          message:"Você foi deslogado com sucesso",
          duration: 3000
        }).present()
        
        this.navCtrl.setRoot(LoginPage);
      });
    }
    
    chatComment(duvida){
      this.modalCtrl.create('ChatPage', {"duvida": duvida}).present();
    }
    
    fechar(){
      this.viewCtrl.dismiss();
    }
    
  }
  