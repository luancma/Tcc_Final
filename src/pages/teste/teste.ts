import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase'
import { LoginPage } from '../login/login';
import { ModalLembretePage } from '../modal-lembrete/modal-lembrete';



@IonicPage()
@Component({
  selector: 'page-teste',
  templateUrl: 'teste.html',
})
export class TestePage {
  
  advogados:any[] = [];
  items:any = [];
  itemsArray = [];
  array:any = [];
  array2 = []
  arrayTeste = []
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController) {
      
      }


    login(){
      this.navCtrl.push(LoginPage)
    }
    criarLembrete(){
      const modal = this.modalCtrl.create(ModalLembretePage);
      modal.present();
    }    
  }
  