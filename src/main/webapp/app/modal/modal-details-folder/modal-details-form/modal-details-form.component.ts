import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct, NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'jhi-modal-details-form',
  templateUrl: './modal-details-form.component.html',
  styleUrls: ['./modal-details-form.component.scss']
})
export class ModalDetailsFormComponent{
  // @Input() continue; 
  userDetailsFormGroup!: FormGroup;
  servicesFormGroup!: FormGroup;
  calendarFormGroup!: FormGroup;
  model!: NgbDateStruct;
  date!: {year: number, month: number};
  minDate!: NgbDate;
  TIME_BUTTON = 'time-button';
  TIME_BUTTON_CLICKED = 'time-button-clicked';
  showErrors = false;
  pages = ['userDetails', 'services', 'calendar']
  page = this.pages[2];
  @Output() getButtonDisabled = new EventEmitter<boolean>();

  Services: Array<any> = [
    { label: 'Full Cut', bio: '$50.00 - 1 Hour', value: 'fullCut' },
    { label: 'Half Cut', bio: '$30.00 - 30 Minutes', value: 'halfCut' },
    { label: 'Bath and Cut', bio: '$60.00 - 1 Hour', value: 'bathCut' },
  ];

  MorningButtons: Array<any> = [
    { name: '10:00 am', value: '10:00am' },
    { name: '10:30 am', value: '10:30am'},
    { name: '11:00 am', value: '11:00am'}
  ]

  AfternoonButtons: Array<any> = [
    { name: '12:00 pm', value: '12:00pm' },
    { name: '1:30 pm', value: '1:30pm'},
  ]
  constructor(private fb: FormBuilder, private calendar: NgbCalendar) {
   this.createForm();
   this.minDate = calendar.getToday();
 }

//  ngOnInit(): void {

//  }

  createForm():void {
   this.userDetailsFormGroup = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    ]),
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required
    ]),
    dogName: new FormControl('', [
      Validators.required
    ]),
    dogSelect: new FormControl('', [
      Validators.required
    ]),
   });

   this.servicesFormGroup = this.fb.group({
    checkArray: this.fb.array([])
   });

   this.calendarFormGroup = this.fb.group({
    calendar: new FormControl(null, [
      Validators.required
    ]),
    time: new FormControl('', [
      Validators.required
    ])
   });
   
 }

 ngAfterViewInit(): void {
   if(this.page === this.pages[0]){
    this.userDetailsFormGroup.statusChanges.subscribe(res => {
      this.getButtonDisabled.emit(res === 'INVALID')
      // console.warn(res === 'INVALID')
    })
   }

   if(this.page === this.pages[1]){
    this.servicesFormGroup.statusChanges.subscribe(res => {
      const checkArray: FormArray = this.servicesFormGroup.get('checkArray') as FormArray;
      if(checkArray.length === 0){
        this.getButtonDisabled.emit(true);
      }
      else {
        this.getButtonDisabled.emit(false);
      }
    })
   }

   if(this.page === this.pages[2]){
     console.warn(this.calendarFormGroup);
    this.calendarFormGroup.statusChanges.subscribe(res => {
      console.warn(this.calendarFormGroup.value);
      if(this.calendarFormGroup.get('calendar')?.value !== null && this.calendarFormGroup.get('time')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
    })
   }
  
}
  continueClicked():void {
    const index = this.pages.indexOf(this.page);
    this.page = this.pages[index + 1];
    // this.continue = true;
    // if(this.formGroup.invalid){
    //   this.showErrors = true;
    // }
    // console.warn(this.formGroup);
  }

  onCheckboxChange(e: any):void {
    const checkArray: FormArray = this.servicesFormGroup.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  setTime(time:string, id:string): void {
    this.calendarFormGroup.get('time')?.setValue(time);
    const element = window.document.getElementById(id);
    if(element?.className === this.TIME_BUTTON) {
      element.className = this.TIME_BUTTON_CLICKED;
    }
    else {
      element!.className = this.TIME_BUTTON;
    }
  }
}