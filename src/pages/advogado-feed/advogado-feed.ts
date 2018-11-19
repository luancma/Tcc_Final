import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, ViewController } from 'ionic-angular';
import firebase, { firestore } from 'firebase';
import { HttpClient } from '@angular/common/http';
import moment from 'moment';
import { LoginPage } from '../login/login';
import { ModalLembretePage } from '../modal-lembrete/modal-lembrete';


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
  nomeCliente: string = '';
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
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad AdvogadoFeedPage');
    }
    
    criarLembrete(){
      const modal = this.modalCtrl.create(ModalLembretePage);
      modal.present();
    }
    
    getDuvidas(){
      this.duvidas = [];
      let query = firebase.database().ref('teste-advogado-cliente').child(this.uid);
      query.once('value', ((docs)=> {
        docs.forEach((doc) => {
          this.duvidas.push(doc.val());
        })
        console.log(this.duvidas[1])
        console.log(this.duvidas[2])
        firebase.database().ref(`duvida/${this.duvidas[2]}`).once('value', ((docs) => {
          docs.forEach((doc) => {
            this.duvidas2.push(doc.val())
          })
        }))
        console.log(this.duvidas2)
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
  