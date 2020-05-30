import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CastExpr } from '@angular/compiler';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataService {  

  public expenses = new Subject<Array<any>>();
  public categories = {
    health: {icon:"heart", name: "Beauty & Health"},
    transportation: {icon:"bus", name: "Transportation"},
    coffee: {icon:"coffee", name: "Coffee and Food"},
    utilities: {icon:"money", name: "Utilities Payments"}
  }
  private _expenses = []

  constructor() { 
    
    
  }

  add(category,value,date):boolean{

    if(value < 0){
      return false
    }

    this._expenses.push({category,date,value})
    this.expenses.next(this._expenses)    
  }

  getByDate(date){
    return this._expenses.filter(e=>e.date === date)
  }

  getByCategory(category){
    return this._expenses.filter(e=> e.category === category)
  }

  get summary () {

    const result = []
    const categories =[]

    this._expenses.map(e=>{
      if(!categories.includes(e.category)){    
        categories.push(e.category)    
        const items = this.getByCategory(e.category)
        const total = items.map(i=>i.value).reduce((a,b)=> a + b)
        result.push({
          category: this.categories[e.category],
          total,
          items
        })
      }
    })
    return result    
  }

  generate(){
    debugger
    this.add("coffee",20, '2020-05-25')
    this.add("coffee",30, '2020-05-24')
    this.add("utilities",40, '2020-05-25')
    this.add("coffee",50, '2020-05-20')
    this.add("transportation",60, '2020-05-20')
    this.add("health",70, '2020-05-25')
  }
}
