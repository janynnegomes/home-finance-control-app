import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/shared/services/data';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chart:any = {}
  total = 0
  summary = []

  constructor(@Inject(DataService) private dataService: DataService) {

      }    ngOnInit(): void {

    this.dataService.expenses.subscribe(data=> {this.summary=this.dataService.summary;    this.total = data.reduce((a,b)=>a+b)
;      console.log('subscribe',this.dataService.summary)})    

    this.summary = this.dataService.summary    
    const labels =  this.summary.map(e=>e.category.name)
    const data = this.summary.map(c=>c.total)
    this.total = data.reduce((a,b)=>a+b)
    
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
