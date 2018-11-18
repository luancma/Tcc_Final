import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm'
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fcm: FCM) {

    let userId = firebase.auth().currentUser.uid;
    console.log(userId)
    this.fcm.getToken().then(token => {
      firebase.database().ref('usuario').child(userId).child('device_token').set(token);
    })

  }

}
