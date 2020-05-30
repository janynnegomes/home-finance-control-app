import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';



@NgModule({
  declarations: [CategoriesComponent, ActivitiesComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule
  ],
  exports:[
    CategoriesComponent,
    ActivitiesComponent
  ]
})
export class ComponentsModule { }
