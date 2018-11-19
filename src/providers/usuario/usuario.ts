import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';


@Injectable()
export class UsuarioProvider {
  
  firedata = firebase.firestore().collection('usuarios')
  firedata2 = firebase.firestore().collection('advogados')
  
  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');
  }
  
  
  addUsuario(novoUsuario) {
    
    var promise = new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(novoUsuario.email, novoUsuario.senha)
      .then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: novoUsuario.nome,
          photoURL: ''
        }).then(() => {
          this.firedata.doc(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            displayName: novoUsuario.nome,
            celular: novoUsuario.celular,
            photoURL: 'give a dummy placeholder url here'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  addAdvogado(novoAdvogado) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(novoAdvogado.email, novoAdvogado.senha)
      .then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName: novoAdvogado.nome,
          photoURL: ''
        }).then(() => {
          this.firedata2.doc(firebase.auth().currentUser.uid).set({
            uid: firebase.auth().currentUser.uid,
            displayName: novoAdvogado.nome,
            celular: novoAdvogado.celular,
            oab: novoAdvogado.oab,
            photoURL: 'give a dummy placeholder url here'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}