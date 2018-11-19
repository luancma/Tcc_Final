import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase'
/**
* Generated class for the ModalLembretePage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-modal-lembrete',
  templateUrl: 'modal-lembrete.html',
})
export class ModalLembretePage {
  
  userId: string  = firebase.auth().currentUser.uid;
  arrayClientes: any [] = [];
  arrayClienteDados:any [] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.getIdCliente();
  } 
  
  
  getIdCliente(){
    console.log('aqui')
    //
    //Adquirindo as dados de id que estão presentes no nó 'teste-advogad0-cliente
    //
    firebase.database().ref('teste-advogado-cliente').child(this.userId)
    .once('value', ((docs) => {
      docs.forEach((doc) => {
        this.arrayClientes.push(doc.val())
      })
      console.log(this.arrayClientes)
         /*
      * Recebendo os dados do array
      */
     console.log(this.arrayClientes[2])

     firebase.database().ref(`usuario/+${this.arrayClientes[2]}`)
     .once('value', ((docs) => {
       docs.forEach((doc) => {
         console.log(doc.key)
         this.arrayClienteDados.push(doc.val())
         console.log('os dados são : ' + this.arrayClienteDados)
        })
     }))
    }))
  }
  
  
  fechar(){
    this.viewCtrl.dismiss();
  }
  
}
