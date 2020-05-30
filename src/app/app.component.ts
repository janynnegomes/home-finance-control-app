import { Component, OnInit, Inject } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from './shared/services/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(@Inject(DataService) private dataService: DataService) {
  }
  
  chart:any = {}

  title = 'Home Finance Control App';

  ngOnInit(): void {

    //generate data
    this.dataService.generate()
    const summary = this.dataService.summary    
    const labels =  summary.map(e=>e.category.name)
    const data = summary.map(c=>c.total)
    const colors =[  'rgb(207, 169, 200)','rgb(235, 149, 83,1)','rgb(74, 184, 147)','rgb(232, 93, 87)']

    this.chart = new Chart('chart', {
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              data: data,
              backgroundColor: colors,
              borderWidth:0            
          }]
      },
      options: {
        responsive:true,
        cutoutPercentage: 80,
        legend: {
          display: false,
      }
    }
    
    });
  }
}
