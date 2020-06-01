import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    ComponentsModule,
    AngularFontAwesomeModule,
    AccordionModule
  ]
})
export class DetailModule { }
