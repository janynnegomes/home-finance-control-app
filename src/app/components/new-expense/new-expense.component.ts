import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/shared/services/data';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {

  categories = []
  constructor(@Inject(DataService) private dataService: DataService) {
  }

  ngOnInit() {
    this.categories = Object.entries(this.dataService.categories)
  }

}
