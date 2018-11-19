import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
 
//Adicionar novo usuário a meta
exports.criarLembrete = functions.database.ref('/lembrete-advogado/{userId}/{key}')
    .onCreate((snapshot, context) => {
          
        console.log(context.params.userId);
        return admin.database().ref('usuario/'+context.params.userId+'/device_token').once('value').then((snaphot2) => {
            if (snaphot2.exists()) {
                let token = snaphot2.val();
                const payload = {
                    notification: {
                      title: 'Caso em andamento!',
                      body: 'O advogado está acompanhando seu caso',
                    }
                  };
                console.log(payload.notification.body);
                return admin.messaging().sendToDevice(token, payload);
            }
            return null;
        });
    });