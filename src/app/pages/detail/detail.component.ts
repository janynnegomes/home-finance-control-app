import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from 'src/app/shared/services/data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  categoryLink:string = ""
  category:any = {}
  categories = []
  total = 0

  constructor(@Inject(DataService) private dataService: DataService,
  private route: ActivatedRoute ,
  private router: Router ) {
    this.categoryLink = route.pathFromRoot[1].snapshot.url[0].path
  }

   ngOnInit() {
    this.load(this.categoryLink)

    if(!this.category){
     this.router.navigate(['home'])
    }

    this.categories = Object.entries(this.dataService.categories)
  }

  load(category){
    this.category = this.dataService.getByLink(category)
    
    this.total = this.category['items'].map(i=>i.total).reduce((a,b)=> a + b)
  }
  open(url){

    console.log('open',url)
    this.router.navigate([url+'/details'])
    this.load(url)

  }

}
