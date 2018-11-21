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
      
      console.log('aqui')
      //
      //Adquirindo as dados de id que estão presentes no 'teste-advogado-cliente
      //
      firebase.database().ref('teste-advogado-cliente').child(this.userId)
      .once('value', ((docs) => {
        console.log(docs)
        //docs.forEach((doc) => {
          //console.log(doc.val())
          Object.keys(docs.val()).forEach(key => {
            this.arrayClienteDados.push(docs.val()[key])
            console.log(this.arrayClienteDados)
          })
          var varial = this.arrayClienteDados[2].uid


          firebase.database().ref('usuario/' + varial)
          .once('value', ((docs) => {
            docs.forEach((doc) => {
              console.log(doc.val())
              this.arrayClientes.push(docs.val()[0])
              console.log(this.arrayClientes)
            })
          }))
        })
      //})
      )
    }
    
    fechar(){
      this.viewCtrl.dismiss();
    }
  }
  