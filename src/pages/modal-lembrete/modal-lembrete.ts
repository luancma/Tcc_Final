import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import firebase from 'firebase'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  userId: string = firebase.auth().currentUser.uid; 
  usuario: any = [];
  lembrete_processo: string ;
  lembrete_body: string ;
  lembrete_local: string ;
  lembrete_data: string ;
  
  registerForm: FormGroup
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,
    public formbuilder: FormBuilder) {
    this.usuario = this.navParams.get("usuario");

    this.registerForm = this.formbuilder.group({
      processo: [null, [Validators.required, Validators.minLength(4)]],
      local: [null, [Validators.required, Validators.minLength(4)]],
      data: [null, [Validators.required, Validators.minLength(8)]],
      lembrete: [null, [Validators.required, Validators.minLength(10)]],
    })
  } 

  fechar(){
    this.viewCtrl.dismiss();
  }

  criarLembrete(){
    firebase.database().ref('lembrete-advogado').child(this.userId).push().set({
      cliente: this.usuario.displayName,
      data: this.lembrete_data,
      processo: this.lembrete_processo,
      local: this.lembrete_local,
      lembrete: this.lembrete_body
    }).then(() => {
      console.log('Lembrete gravado')
    }).catch((erro) => {
      console.log(erro)
    })

  }

  
}
