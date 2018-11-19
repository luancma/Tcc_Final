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
  pageSize: number = 5;
  cursor: any;
  infiniteEvent: any;        
  usuario: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private http: HttpClient) {

      
      this.usuario = firebase.auth().currentUser.displayName;
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
      let loading =  this.loadingCtrl.create({
        content:"Carregando as suas perguntas"
      })
      loading.present()
      let query = firebase.firestore().collection("duvidas").orderBy("created", "desc")
      .limit(this.pageSize);
      query.get()
      .then((docs) => {
        docs.forEach((doc) => {
          this.duvidas.push(doc);
        })
        loading.dismiss();
        this.cursor = this.duvidas[this.duvidas.length -1];
      }).catch((erro) => {
        console.log(erro)
      }) 
    }
    
    carregarDuvidas(event){
      firebase.firestore().collection("duvidas").orderBy("created", "desc").startAfter(this.cursor).limit(this.pageSize).get()
      .then((docs) => {
        
        docs.forEach((doc) => {
          this.duvidas.push(doc);
        })
        
        if(docs.size < this.pageSize){
          event.enable(false);
          this.infiniteEvent = event;
          
        }else{
          event.complete();
          this.cursor = this.duvidas[this.duvidas.length -1];
        }
        
      }).catch((erro) => {
        console.log(erro)
      })
    }
    
    getTempo(time){
      let tempo = moment(time).diff(moment());  
      return moment.duration(tempo).humanize();
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
  