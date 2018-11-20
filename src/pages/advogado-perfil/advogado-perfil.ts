import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-advogado-perfil',
  templateUrl: 'advogado-perfil.html',
})
export class AdvogadoPerfilPage {
  image: string;
  text: string =''
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private loadingCtrl: LoadingController) {
      
    }
    userId: string = firebase.auth().currentUser.uid;  
    
    addFoto(){
      this.carregarCamera();
    }
    
    carregarCamera(){
      const options: CameraOptions = {
        quality:100,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true,
        targetHeight: 512,
        targetWidth: 512,
        allowEdit: true
      }
      
      this.camera.getPicture(options).then((base64Image) => {
        console.log(base64Image);
        this.image = "data:image/png;base64," + base64Image;
        console.log(this.image)
        let ref = firebase.storage().ref("/testes" + name);
        ref.putString(this.image, 'base64').then(function(snapshot) {
          console.log('Uploaded a base64 string!');
        });
      }).catch((erro) => {
        console.log(erro)
      })
    }
  }
  