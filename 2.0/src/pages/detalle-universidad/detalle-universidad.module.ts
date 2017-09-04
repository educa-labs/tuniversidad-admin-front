import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleUniversidadPage } from './detalle-universidad';

@NgModule({
  declarations: [
    DetalleUniversidadPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleUniversidadPage),
  ],
})
export class DetalleUniversidadPageModule {}
