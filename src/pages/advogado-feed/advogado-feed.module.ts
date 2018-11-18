import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdvogadoFeedPage } from './advogado-feed';

@NgModule({
  declarations: [
    AdvogadoFeedPage,
  ],
  imports: [
    IonicPageModule.forChild(AdvogadoFeedPage),
  ],
})
export class AdvogadoFeedPageModule {}
