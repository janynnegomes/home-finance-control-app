import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  chart:any = {}

  title = 'Home Finance Control App';

  ngOnInit(): void {
    this.chart = new Chart('chart', {
      type: 'doughnut',
      data: {
          labels: ['Restaurants and coffees', 'Utility Payments','Health and Beauty','Transport'],
          datasets: [{
              label: '# of Votes',
              data: [1171, 800, 90, 500],
              backgroundColor: [
                  'rgb(207, 169, 200)',
                  'rgb(235, 149, 83,1)',
                  'rgb(74, 184, 147)',
                  'rgb(232, 93, 87)'
              ],
              weight:1
          }]
      },
      options: {
        responsive:true,
        legend: {
          display: false,
      }
    }
    
    });
  }
}
