import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLembretePage } from './modal-lembrete';

@NgModule({
  declarations: [
    ModalLembretePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalLembretePage),
  ],
})
export class ModalLembretePageModule {}
