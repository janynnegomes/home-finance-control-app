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

  newExpenseLoadingTitle:string =""
  newExpenseLoadingText:string=""
  newExpenseShowLoading:boolean = false

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

    this.newExpenseLoadingText = 'while we are saving your new expense'
    this.newExpenseLoadingTitle = "Wait a moment"
    this.newExpenseShowLoading = true;

    this.dataService.add(
      this.newExpense['category'].name,
      parseFloat(this.newExpense['value']), 
      this.datePipe.transform(this.newExpense['date'],'yyyy-MM-dd'),
      this.newExpense['location'])     

      let modal =this.modalRef
      let loading =this.newExpenseShowLoading
      // setTimeout(function(){
      //   loading = false;
      //   modal.hide();
      // },1000)
      
  }
}
