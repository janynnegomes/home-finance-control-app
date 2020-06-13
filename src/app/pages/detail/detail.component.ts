import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/shared/services/data';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { DatePipe,CurrencyPipe } from '@angular/common';
import { debug } from 'util';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  categoryLink:string = ""
  category:any = {}
  categories = []
  data = []
  labels=[]
  total = 0
  chart:any = {}
  categoryColor ='rgb(207, 169, 200, 0.8)'
  selected = {}
  items = []

  constructor(@Inject(DataService) private dataService: DataService,
  private route: ActivatedRoute ,
  private router: Router,
  private datePipe: DatePipe,
  private currencyPipe: CurrencyPipe ) {
    this.categoryLink = route.pathFromRoot[1].snapshot.url[0].path
  }

   ngOnInit() {
    this.total = 0
    this.load(this.categoryLink)

    if(!this.category){
     this.router.navigate(['home'])
    }

    this.categories = Object.entries(this.dataService.categories)
  }

  load(category){
    this.category = this.dataService.getByLink(category)    

    // sort items by date
    debugger
    this.items = JSON.parse(JSON.stringify(this.category.items)).sort((a,b)=> new Date(a.date) > new Date(b.date)? -1: 1)
    this.selected = category
    this.total = this.category['items'].length > 0 ? this.category['items'].map(i=>i.total).reduce((a,b)=> a + b):0;
    this.loadChart()
  }

  loadChart(){
    const labels  = []
    const colors =[]

    let chartData = JSON.parse(JSON.stringify(this.category.items)).sort((a,b)=> new Date(a.date) > new Date(b.date)? 1: -1)
    
    chartData = chartData.map(c=>{
      debugger
      const date = new Date(c.date+"T00:00:00")
      const label = this.datePipe.transform(date,'dd/MMM')
      labels.push(label)
      colors.push(this.categoryColor)
      return {x: label, y: c.total, legend:this.currencyPipe.transform(c.total,'USD')}
    })

    if(this.chart.hasOwnProperty("ctx")){

      // update chart labels and data
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = chartData;      
      this.chart.data.datasets[0].backgroundColor = colors;
      this.chart.update();      
    }
    else{
      
      this.chart = new Chart('chartCategory', {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: chartData,
                backgroundColor: colors,
                borderColor:'rgb(207, 169, 200)',
                borderWidth:1        
            }]
        },
        options: {
          responsive:true,
          legend: {
            display: false,
          },
          tooltips: {
            backgroundColor: 'rgb(232, 93, 87,0.8)',
            callbacks: {
              label: function(tooltipItem, chart) {
                const legend = chart.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].legend
                return legend
              }
          }
          },
          scales: {
            xAxes:[{
              gridLines:{
                display:false
              },
              ticks:{
                fontColor: '#ffffff'
              }
            }],
            yAxes:[{
              gridLines:{
                display:true,
                color: 'rgb(207, 169, 200, 0.5)'
              },
              ticks:{
                fontColor: 'rgb(255,255,255, 0.8)',
                beginAtZero: true
              }
            }]
          }
        }      
      });
    }
  }
  open(url){

    console.log('open',url)
    this.router.navigate([url+'/details'])
    this.load(url)

  }

}
