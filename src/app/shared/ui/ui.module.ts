import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingModule } from './loading/loading.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoadingModule
  ],
  exports:[
    LoadingModule
  ]
})
export class UiModule { }
