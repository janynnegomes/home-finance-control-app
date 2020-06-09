import { Component, OnInit, Inject, TemplateRef, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { DataService } from './shared/services/data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { NewExpenseComponent } from './components/new-expense/new-expense.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {


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
  formValid : boolean = false
  displayFormErrors : boolean = false
  //@ViewChild('expensesForm', {static:true, read: ElementRef}) expensesForm: ElementRef;
  @ViewChild(NewExpenseComponent, {read:false, static:true})
  expensesForm: NewExpenseComponent;

  constructor(@Inject(DataService) private dataService: DataService,
  private modalService: BsModalService,
  private datePipe: DatePipe) {
  }  

  ngOnInit(): void {
    this.dataService.generate()  
       
  }

  ngAfterViewInit(): void {
    debugger
    console.log('this.primarySampleComponent',this.expensesForm)
  }
  
  open(template: TemplateRef<any>) {
    this.newExpenseShowLoading = false
    this.displayFormErrors = false
    this.formValid = false
    this.modalRef = this.modalService.show(template,this.config);
  }

  save(){

    this.displayFormErrors = true
  
    if(this.formValid){

      this.newExpenseLoadingText = 'while we are saving your new expense'
      this.newExpenseLoadingTitle = "Wait a moment"
      this.newExpenseShowLoading = true;

      debugger
      this.dataService.add(
        this.newExpense['category'].name,
        parseFloat(this.newExpense['value']), 
        this.datePipe.transform(this.newExpense['date'],'yyyy-MM-dd'),
        this.newExpense['location'])     

        let modal =this.modalRef
        let loading =this.newExpenseShowLoading
        setTimeout(function(){
          loading = false
          modal.hide()
        },600)
    }
      
  }

  validChanged(value){
    console.log('value chaged', value)
    this.formValid = value
  }
}
