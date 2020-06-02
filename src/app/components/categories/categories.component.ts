import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/shared/services/data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  items =[]
  expensesSubscriber =  this.dataService.expenses;

  constructor(@Inject(DataService) private dataService: DataService) {
          
         }

  ngOnInit() {    
    const summary = this.dataService.summary
    console.log(summary)
    this.items = summary
    this.expensesSubscriber.subscribe(data=> {this.items=this.dataService.summary; console.log('subscribe',this.dataService.summary)})    
  }

  ngOnDestroy(){
    this.expensesSubscriber.unsubscribe()
  }

}
