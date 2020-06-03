import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,    
    AngularFontAwesomeModule
  ],
  exports:[
    LoadingComponent
  ]
})
export class LoadingModule { }
