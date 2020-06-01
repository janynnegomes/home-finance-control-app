import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';
import { NewExpenseComponent } from './new-expense/new-expense.component';



@NgModule({
  declarations: [CategoriesComponent, ActivitiesComponent, DetailsComponent, NewExpenseComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    RouterModule
  ],
  exports:[
    CategoriesComponent,
    ActivitiesComponent,
    DetailsComponent,
    NewExpenseComponent,
    RouterModule
  ]
})
export class ComponentsModule { }
