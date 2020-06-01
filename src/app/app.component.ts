import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { DataService } from './shared/services/data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Home Finance Control App';
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(@Inject(DataService) private dataService: DataService,
  private modalService: BsModalService) {
  }  

  ngOnInit(): void {
    this.dataService.generate()  
  }
  
  open(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
}
