import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductosPCategoriaPage } from './productos-p-categoria';


@NgModule({
  declarations: [
    ProductosPCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductosPCategoriaPage),
  ],
})
export class TestPageModule {}