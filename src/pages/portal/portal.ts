import { Component, ComponentFactoryResolver } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, ModalController, Item } from 'ionic-angular';
import firebase, { database } from 'firebase';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';

@IonicPage()
@Component({
  selector: 'page-portal',
  templateUrl: 'portal.html',
})
export class PortalPage {
  
  text: string = "";
  duvidas: any [] = [];       
  pageSize: number = 5;
  cursor: any;
  infiniteEvent: any;        
  image: string;           
  array = [];
  array2 = []
  items= []
  
   teste3:any [] = [];
   teste4:any [] = [];
   valor: any ='';
  
  userId: string = firebase.auth().currentUser.uid;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private camera: Camera,
    private http: HttpClient){
      this.getDuvidas();
      console.log(this.duvidas)
    }
    
    getDuvidas(){
      this.duvidas = [];
      let loading =  this.loadingCtrl.create({
        content:"Carregando as suas perguntas"
      })
      loading.present()
      firebase.database().ref('duvida/'+this.userId).on('value', (snapshot) => {
        snapshot.forEach((doc) => {
          this.duvidas.push(doc.val())
          this.duvidas = this.duvidas.slice(0).reverse()
        })
        console.log(this.duvidas)
        loading.dismiss();
      })
    }
    
    //CRIAR UMA DÚVIDA
    post(){
      this.getIds();
      console.log(this.array2)
      let query = firebase.database().ref('duvida/'+this.userId).push()
      query.set({
        duvidaTexto: this.text,
        uidUsuario: this.userId,
        postId: query.key,
        time: firebase.database.ServerValue.TIMESTAMP
      })
      .then(async (dic) =>{
        console.log(dic)
        if(this.image){
          await this.upload(dic.id)
        }
        this.text = "";
        this.image = undefined;
        this.http.get("https://us-central1-chatyoutb.cloudfunctions.net/teste").subscribe((data) => {
        console.log('data', data);
      })
      let toast = this.toastCtrl.create({
        message: "Sua mensagem foi publicada com sucesso",
        duration: 3000
      }).present()
      this.getDuvidas()
      firebase.database().ref('duvida/'+this.userId).once('value', (snapshot) => {
        snapshot.forEach((doc) => {
          this.teste3.push(doc.key)
        })
        this.valor = this.teste3.length-1;
        console.log(this.teste3[this.valor])

        for(let i = 0; i < 4; i++){
          console.log(this.array2[i])
        }
      }).then(() => {
        for(let i = 0; i < 4 ; i++){
          let key = firebase.database().ref('teste-advogado-cliente/'+this.array2[i]).push().key;
          firebase.database().ref('teste-advogado-cliente/'+this.array2[i]+'/'+key).set({
            uid: this.userId,
            advogadoId: this.array2[i],
            chatId: this.teste3[this.valor]
          })
        }
        console.log("SALVO NO BANCO")
      })
    }).catch((erro) =>{
      console.log(erro);
    })
  }

  getIds(){
    firebase.database().ref('advogado/').once('value', ((docs) =>{
      docs.forEach((doc) =>{
        this.items.push(doc.key)
      })
      while(this.array.length < 4){
        var aleatorio = Math.floor(Math.random() * (this.items.length - 0 + 0)) + 0;
        if (this.array.indexOf(aleatorio) == -1)
          this.array.push(aleatorio);
      }
      for(let i = 0; i < this.array.length; i ++){
        this.array2.push(this.items[this.array[i]]) 
      }
      console.log(this.array2)
    }))
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
  //FAZER O UPLOAD A IMAGEM
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
  
  chatComment(duvida){
    this.navCtrl.push('ChatPage', {"duvida":duvida })
  }
}
