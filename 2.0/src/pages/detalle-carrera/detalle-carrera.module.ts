import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleCarreraPage } from './detalle-carrera';

@NgModule({
  declarations: [
    DetalleCarreraPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleCarreraPage),
  ],
})
export class DetalleCarreraPageModule {}
