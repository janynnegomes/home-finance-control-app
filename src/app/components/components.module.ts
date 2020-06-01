import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CategoriesComponent, ActivitiesComponent, DetailsComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule
  ],
  exports:[
    CategoriesComponent,
    ActivitiesComponent,
    DetailsComponent,
    RouterModule
  ]
})
export class ComponentsModule { }
