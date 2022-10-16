import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective, NgModel, NgForm ,FormControl} from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
//import { AnyRecord } from 'dns';
import { Feedback, ContactType } from '../shared/feedback';





@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})


export class ContactComponent implements OnInit {

  feedbackForm!: FormGroup;
  feedback: Feedback[]=[];
  contactType = ContactType;
  @ViewChild('fform')
  feedbackFormDirective!: NgForm;
  obj:any;
  feedbackCopy!:Feedback[];
  feedbackIds!: Feedback;
  condition:number=0;
  errMess!:string;

   formErrors :{[key:string]:any }={
  'firstname':'',
  'lastname':'',
  'telnum':'',
  'email':''


  };
  

  validationMessages:{[key:string]:any }={

    'firstname': {
      'required':'First Name is required',
      'minlength': 'First Name Lenghth minimum 2 characters',
      'maxlength': 'First Name Length max is 25 characters'
    },
    'lastname': {
      'required': 'Last Name is required',
      'minlength': 'Last Name Lenghth minimum 2 characters',
      'maxlength': 'Last Name Length max is 25 characters'
    },
    'telnum': {
      'required':'Telephone Number is required',
      'pattern': 'Telephone numbers must contain only numbers'
    },
    'email': {
      'required': 'Email Number is required',
      'email': 'Email format should be valid'
    },
  };


  


  constructor(private fb: FormBuilder,private feedbackservice:FeedbackService) {
    this.createForm();
  }

  ngOnInit(): void {
  }


  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''

    });

    this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); //(re)set validation message now
  }

  onValueChanged(data?:any){
    if (!this.feedbackForm) {return;
    }
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






  onSubmit() {
     if(this.feedbackForm.invalid){
      return ;
    }
    else{
      this.condition=1;
        this.obj= this.feedbackForm.value;
        this.feedbackservice.putFeedback(this.obj).subscribe(feedback =>{
          this.feedback.push(this.obj);
        },errMess=> {
          this.feedback!=null;
         //this.DishCopy!=null;
          this.errMess=<any>errMess;})
       }
       //this.feedbackservice.getFeedbackIds(this.obj).subscribe(feedbackIds => this.feedbackIds =feedbackIds);
     // this.feedbackFormDirective.resetForm();
      //this.feedbackCopy.push(this.obj);
      //this.feedbackCopy = this.obj;
      }
     // console.log('User: ',this.user);
  }
    

  




 





