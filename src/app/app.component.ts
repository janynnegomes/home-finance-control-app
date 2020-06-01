import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from './shared/services/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(@Inject(DataService) private dataService: DataService) {
  }  
  
  title = 'Home Finance Control App';

  ngOnInit(): void {
    this.dataService.generate()  }
}
