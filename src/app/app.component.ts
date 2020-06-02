import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { DataService } from './shared/services/data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Home Finance Control App';
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };
  newExpense = {}

  constructor(@Inject(DataService) private dataService: DataService,
  private modalService: BsModalService,
  private datePipe: DatePipe) {
  }  

  ngOnInit(): void {
    this.dataService.generate()  
    
  }
  
  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
  save(){
    debugger
    this.dataService.add(
      this.newExpense['category'].name,
      this.newExpense['value'], 
      this.datePipe.transform(this.newExpense['date'],'yyyy-MM-dd'),
      this.newExpense['location'])
      this.modalRef.hide();
  }
}
