import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-lembrete',
  templateUrl: 'lembrete.html',
})
export class LembretePage {

    
  userId: string  = firebase.auth().currentUser.uid;
  arrayClientes: any [] = [];
  arrayClienteDados:any [] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
      this.getIdCliente();
  }

  criarLembrete(usuario){
    const modal = this.modalCtrl.create('ModalLembretePage', {"usuario":usuario });
    modal.present();
  }

  getIdCliente(){
    this.arrayClienteDados = [];
    console.log('aqui')
    //
    //Adquirindo as dados de id que estão presentes no nó 'teste-advogado-cliente
    //
    firebase.database().ref('teste-advogado-cliente').child(this.userId)
    .once('value', ((docs) => {
      docs.forEach((doc) => {
        this.arrayClientes.push(doc.val())
      })
      console.log(this.arrayClientes)
    })).then(() => {
      console.log(this.arrayClientes[2])
      firebase.database().ref('usuario')
      .once('value', ((docs) => { 
        docs.forEach((doc) => {
          console.log(doc.val())
          this.arrayClienteDados.push(doc.val())
          console.log(this.arrayClienteDados)  
         })
         console.log(this.arrayClienteDados)
      }))
    })
  }

  fechar(){
    this.viewCtrl.dismiss();
  }
}
