import { Component, OnInit, Input,ViewChild, NgModule,Output, EventEmitter,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgModel, NgForm } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { DatePipe } from '@angular/common';
import { Comment } from '../shared/Comment';
import { trigger,animate,state,style,transition } from '@angular/animations';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    trigger('visibility', [
      state('shown',style({
        transform:'scale(1.0)',
        opacity:1
      })),
      state('hidden',style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('* => *',animate('0.5s ease-in-out'))
    ])
  ]

})


export class DishdetailComponent implements OnInit {
 
  user={author:'',comment:'',gridsize:''};


  gridsize: number=0;
  updatingsetting(event:any){
    this.gridsize=event.value;
    return this.gridsize;
  }

 
 
today= new Date();
changedDate='';
errMess!:string;
DishCopy!:Dish;
visibility='shown';



pipe=new DatePipe('en-US');
changeFormat(today:any){
  let changedFormat=this.pipe.transform(this.today,'dd/MM/YYYY');
  this.changedDate=changedFormat as string;
  console.log(this.changedDate);
}




  @Input()
  dish!: Dish;
  comment!:Comment[];
  dishIds!: string[];
  prev!: string;
  next!: string;
  feedbackForm!: FormGroup;
  feedback!: Feedback;
  @ViewChild('fform')
  feedbackFormDirective!: NgForm;


  @Output() usercomment= new EventEmitter();


  formErrors: { [key: string]: any } = {
    'name': '',
    'comment': '',


  };

  


  validationMessages: { [key: string]: any } = {

    'name': {
      'required': 'Name is required',
      'minlength': 'First Name Lenghth minimum 2 characters',
      'maxlength': 'First Name Length max is 25 characters'
    },
    'comment': {
      'required': 'Character is required',
      'minlength': 'Last Name Lenghth minimum 1 characters',
    },
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL:any
    
  ) { this.createForm();
    //console.log(this.formatLabel());
    
  }


  createForm(): void {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', [Validators.required, Validators.minLength(1)]],
      rating:5,


    });
    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //(re)set validation message now
    
  }

  onValueChanged(data?:any){
    if (!this.feedbackForm) {return;}
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previos err message(if any)
       this.formErrors[field]='';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += message[key] + ' ';
            }
          }
        }
      }
    }
    
  }
  



submitted:Boolean =false;
replycomment: Comment[]=[];
 obj!:any;
  



  onSubmit() {
    this.submitted=true;
     if(this.feedbackForm.invalid){
      return ;
    }
   else{
     this.obj=({
        rating:this.gridsize,
        comment:this.user.comment,
        author:this.user.author,
        date:this.today.toDateString(),
        });
      this.comment = this.feedbackForm.value;
    this.dish.comments?.push(this.obj);
     
   //this.replycomment.push(this.obj);
   
    
    this.feedbackFormDirective.resetForm();
    this.DishCopy.comments.push(this.obj);
    this.dishservice.putDish(this.DishCopy).subscribe(dish =>{
      this.dish = dish;
      this.DishCopy=dish;
    },errMess=> {
      this.dish!=null;
      this.DishCopy!=null;
      this.errMess=<any>errMess;})
    console.log('User: ',this.user);
   }
  
    

  }
    ngOnInit(): void {
      
      const id = +this.route.snapshot.params['id'];
      //this.dishservice.getDish(id.toString()).subscribe(dish => this.dish = dish);
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params.pipe(switchMap((params: Params) => {this.visibility ='hidden'; return this.dishservice.getDish(params['id']);})).
        subscribe(dish => {
          this.dish = dish;this.DishCopy=dish;
          this.setPrevNext(dish.id);this.visibility='shown';
        },errMess => this.errMess= <any>this.errMess)
    }
    setPrevNext(dishId: string){
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }




    goBack(): void {
      this.location.back();
    }

  }


