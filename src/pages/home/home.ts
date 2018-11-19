import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import firebase from 'firebase';import { PortalPage } from '../portal/portal';
import { AdvogadoFeedPage } from '../advogado-feed/advogado-feed';
import { CameraOptions, Camera } from '@ionic-native/camera';
;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userId: string = "";
  name: string = "";
  email: string = "";
  tipoLogin: string = "";
  status: boolean;
  image: string;
  
  constructor(
    public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private camera: Camera,
    private toastCtrl: ToastController) {
      this.userId = firebase.auth().currentUser.uid;
    }
    

    post(){
      firebase.firestore().collection("imagemPerfil").add({
      }).then(async (doc) =>{      
        console.log(doc)
        
        if(this.image){
          await this.upload(doc.id)
          
          this.image = 'teste';
          let toast = this.toastCtrl.create({
            message: "Sua mensagem foi publicada com sucesso",
            duration: 3000
          }).present()
        }
      }).catch((erro) =>{
        console.log(erro);
      })
    }
    
    addFoto(){
      this.carregarCamera();
    }
    
    carregarCamera(){
      let options: CameraOptions = {
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
      }).catch((erro) => {
        console.log(erro)
      })
    }
    
    upload(name : string){
      return new Promise((resolve, reject) => {
        let loading = this.loadingCtrl.create({
          content: "Carregando imagens"
        })
        let ref = firebase.storage().ref("imagemDuvida/" + name);
        let uploadTask = ref.putString(this.image.split(',')[1],"base64");
        uploadTask.on("state_changed", (taskSnapshot: any) =>{
          console.log(taskSnapshot)
          let percentage = taskSnapshot.bytesTrasferred / taskSnapshot.totalBytes * 100;
          loading.setContent("Carregado" + percentage + "%")
        }, (erro) => {
          console.log(erro)
        }, ()=>{
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            firebase.firestore().collection("duvidas").doc(name).update({
              image: url
            }).then(() => {
              loading.dismiss()
              resolve()
            }).catch((erro) => {
              loading.dismiss()
              reject()
            })
          }).catch((erro) => {
            loading.dismiss()
            reject()
          })
        })
      })
    }
  }
  