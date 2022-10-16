import { Component, OnInit, Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { flyInOut } from '../animation/app.animation';
import { trigger,animate,state,style,transition } from '@angular/animations';
//import {baseurl.DISHES} from '../shared/baseurl';





@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  
host:{
  '[@flyInOut]':'true',
  'style':'display:block;'
  },
  animations:[
    trigger('flyInOut', [
      state('*',style({
        transform:'translateX(0)',
        opacity:1
      })),
      transition(':enter',[
        style({
        transform:'translateX(-100%)'
      }),
      animate('500ms ease-In')
    ]),
      transition(':leave',[
          animate('500ms ease-out', style({transform:'translateX(100%)',opacity:0}))
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {
  dishes! : Dish[];
  errMess!:string;
  //selectedDish! : Dish;
  
  //comment: DISHDETAIL=dishdetail;
  //commentt: DISHDETAIL = dishdetail.comments;
 
  

   
  
  
  //comment :dishde
   constructor(private dishService: DishService ,@Inject('BaseURL') public BaseURL:any){}//){}  //) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => this.dishes=dishes,
    errMess => this.errMess= <any>this.errMess);
  }
// onSelect(dish:Dish){
//  this.selectedDish = dish;
// }
}
