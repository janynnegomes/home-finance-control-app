import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CastExpr } from '@angular/compiler';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class DataService {  

  public expenses = new Subject<Array<any>>();
  public snapshot = {categories:[], expenses:[], total:0}

  public categories = {
    health: {icon:"heart", name: "Beauty & Health", link:"beauty-and-health"},
    transportation: {icon:"bus", name: "Transportation", link:"transportation"},
    coffee: {icon:"coffee", name: "Coffee and Food", link:"coffee-and-food"},
    utilities: {icon:"money", name: "Utilities Payments", link:"utilities-payments"}
  }

  constructor() { 
    this.loadExpenses()
  }

  add(category,value,date, name, note){

    this.loadExpenses()

    this.snapshot.expenses = JSON.parse(localStorage.getItem('expenses'))

    if(value < 0){
      this.expenses.next([{error:{message:"negative"}}])  
    }
    else{
      this.snapshot.expenses.push({category,date,value, name, note})
      localStorage.setItem('expenses', JSON.stringify(this.snapshot.expenses))
      this.expenses.next(this.snapshot.expenses)  
    }
  }

  getByDate(date){
    this.loadExpenses();
    return this.snapshot.expenses.filter(e=>e.date === date)
  }

  getByCategory(category){
    this.loadExpenses()
    const dates = []
    const items = this.snapshot.expenses.filter(e=> e.category === category)
    const result = []

    items.map(i=> {
      if(!dates.includes(i.date)){
        dates.push(i.date)
        const itemsOnDate =  items.filter(d=>d.date === i.date)
        const totalOnDate = itemsOnDate.map(i=>i.value).reduce((a,b)=> a + b)
        result.push({ date: i.date, items:itemsOnDate, total: totalOnDate})
      }     
    })

    return result
  }

  getByLink(link){

    const category = Object.entries(this.categories).find(c=>c[1].link === link)

    if(category.length > 0){
      return {  category,
                items: this.getByCategory(category[0])}
    }
    else{
      return {}
    }
  }

  get summary () {

    const result = []
    const categories =[]

    this.loadExpenses();
    
    this.snapshot.expenses.map(e=>{
      if(!categories.includes(e.category)){    
        // controll categories found
        categories.push(e.category) 

        let category = this.getByCategory(e.category)   
        
        const total = category.map(i=>i.total).reduce((a,b)=> a + b)

        result.push({
          category: this.categories[e.category],
          total,
          items:category
        })
      }
    })

    return result    
  }

  generate(){

    
    if(!localStorage.getItem('expenses')){
      localStorage.setItem('expenses',JSON.stringify([]))
      // this.add("coffee",20, '2020-05-25',"Starbucks")
      // this.add("coffee",4, '2020-05-25',"MC Donalds")
      // this.add("coffee",30, '2020-05-24',"Starbucks")
      // this.add("utilities",40, '2020-05-25',"Cellphone")
      // this.add("coffee",50, '2020-05-20',"Burger King")
      // this.add("transportation",60, '2020-05-20',"Uber")
      // this.add("health",70, '2020-05-25',"Makeup")
    }   

    
  }

  loadExpenses(){
    if(!localStorage.getItem('expenses')){
      localStorage.setItem('expenses',JSON.stringify([]))
    }

    this.snapshot.expenses = JSON.parse(localStorage.getItem('expenses'))
  }
}
