import { Component, OnInit, Inject, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/shared/services/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {

  categories = []
  bsValue = new Date();
  maxDate = new Date();
  categorySelected = {}

  @Input()
  data = {}

  @Input()
  displayErrors :boolean = false

  @Output()
  dataChange = new EventEmitter()

  @Output() 
  isValid= new EventEmitter()
  
  formGroupExpense = new FormGroup({
    value: new FormControl('', [Validators.required, Validators.min(0)]),
    category: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required, Validators.minLength(1)]),
    date: new FormControl('', Validators.required),
    notes: new FormControl(''),    
  });

  constructor(@Inject(DataService) private dataService: DataService) {
  }

  ngOnInit() {
    this.categories = Object.entries(this.dataService.categories).map(i=> { return{ name: i[0], value:i[1], search: i[1].name }})
    console.log(this.categories)
    this.maxDate.
    setDate(this.maxDate.getDate() + 7);   
    
    this.formGroupExpense.valueChanges.subscribe(value=> {console.log(value), this.dataChange.emit(value), this.isValid.emit(this.formGroupExpense.valid)})
  }

  get formGroupControls(){
    return this.formGroupExpense.controls;
  }

}
