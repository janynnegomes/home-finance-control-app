import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';



@NgModule({
  declarations: [CategoriesComponent, ActivitiesComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
