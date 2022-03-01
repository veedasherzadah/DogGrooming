import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-modal-details-form',
  templateUrl: './modal-details-form.component.html',
  styleUrls: ['./modal-details-form.component.scss'],
})
export class ModalDetailsFormComponent {
  userDetailsFormGroup!: FormGroup;
  servicesFormGroup!: FormGroup;
  calendarFormGroup!: FormGroup;

  date!: { year: number; month: number };
  minDate!: NgbDate;
  calendarValid = false;

  pages = ['enterDetails', 'selectService', 'dateTime'];
  page = this.pages[0];

  @Output() getButtonDisabled = new EventEmitter<boolean>();
  @Output() getSubmitDisabled = new EventEmitter<boolean>();

  Services: Array<any> = [
    { label: 'Full Cut', bio: '$50.00 - 1 Hour', value: 'fullCut', desc: 'Typical shave leaving a 1/2 inch of hair or less.' },
    {
      label: 'Half Cut',
      bio: '$30.00 - 30 Minutes',
      value: 'halfCut',
      desc: 'Clippers and scissoring used to trim hair to 1/2 an inch or longer.',
    },
    { label: 'Bath and Cut', bio: '$60.00 - 1 Hour', value: 'bathCut', desc: 'A full body bath followed by a Half Cut.' },
  ];

  MorningButtons: Array<any> = [
    { name: '10:00 am', value: '10:00am' },
    { name: '10:30 am', value: '10:30am' },
    { name: '11:00 am', value: '11:00am' },
  ];

  AfternoonButtons: Array<any> = [
    { name: '12:00 pm', value: '12:00pm' },
    { name: '1:30 pm', value: '1:30pm' },
  ];
  constructor(private fb: FormBuilder, private calendar: NgbCalendar) {
    this.createForm();
    this.minDate = calendar.getToday();

    this.userDetailsFormGroup.statusChanges.subscribe(res => {
      // console.warn(this.userDetailsFormGroup)
      this.getButtonDisabled.emit(res === 'INVALID');
      this.checkSubmitDisabled();
    });

    this.servicesFormGroup.statusChanges.subscribe(res => {
      console.warn(this.servicesFormGroup.get('service')?.value);
      if (this.servicesFormGroup.get('service')?.value !== '') {
        console.warn('shouldnot be disabled');
        this.getButtonDisabled.emit(false);
      }
      // const checkArray: FormArray = this.servicesFormGroup.get('checkArray') as FormArray;
      // if(checkArray.length === 0){
      //   this.getButtonDisabled.emit(true);
      // }
      // else {
      //   this.getButtonDisabled.emit(false);
      // }
      this.checkSubmitDisabled();
    });
    this.calendarFormGroup.statusChanges.subscribe(res => {
      console.warn(this.calendarFormGroup.get('calendar')?.value);
      console.warn(this.calendarFormGroup.get('time')?.value);
      if (this.calendarFormGroup.get('calendar')?.value !== null) {
        this.calendarValid = true;
      }

      if (this.calendarFormGroup.get('calendar')?.value !== null && this.calendarFormGroup.get('time')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
      this.checkSubmitDisabled();
    });
  }

  createForm(): void {
    this.userDetailsFormGroup = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
      ]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      dogName: new FormControl('', [Validators.required]),
      dogSelect: new FormControl('', [Validators.required]),
    });

    this.servicesFormGroup = this.fb.group({
      // checkArray: this.fb.array([])
      service: new FormControl('', [Validators.required]),
    });

    this.calendarFormGroup = this.fb.group({
      calendar: new FormControl(null, [Validators.required]),
      time: new FormControl('', [Validators.required]),
    });
  }

  //  ngAfterViewInit(): void {
  //    console.warn("in here")
  //    if(this.page === this.pages[0]){
  //     this.userDetailsFormGroup.statusChanges.subscribe(res => {
  //       // console.warn(this.userDetailsFormGroup)
  //       this.getButtonDisabled.emit(res === 'INVALID')
  //     })
  //    }

  //    if(this.page === this.pages[1]){
  //     this.servicesFormGroup.statusChanges.subscribe(res => {
  //       console.warn(this.servicesFormGroup.get('service')?.value)
  //       if(this.servicesFormGroup.get('service')?.value !== '') {
  //         this.getButtonDisabled.emit(false);
  //       }
  //       // const checkArray: FormArray = this.servicesFormGroup.get('checkArray') as FormArray;
  //       // if(checkArray.length === 0){
  //       //   this.getButtonDisabled.emit(true);
  //       // }
  //       // else {
  //       //   this.getButtonDisabled.emit(false);
  //       // }
  //     })
  //    }

  //    if(this.page === this.pages[2]){
  //     this.calendarFormGroup.statusChanges.subscribe(res => {
  //       console.warn(this.calendarFormGroup.get('calendar')?.value);
  //       console.warn(this.calendarFormGroup.get('time')?.value);

  //       if(this.calendarFormGroup.get('calendar')?.value !== null && this.calendarFormGroup.get('time')?.value !== '') {
  //         this.getButtonDisabled.emit(false);
  //       }
  //     })
  //    }

  // }
  continueClicked(page: string): void {
    // const index = this.pages.indexOf(this.page);
    // this.page = this.pages[index + 1];
    this.page = page;

    this.checkStatusOfContinue();
  }

  onCheckboxChange(e: any): void {
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

  changeModalPage(pageName: string): void {
    if (pageName === 'enterDetails') {
      this.page = this.pages[0];
    }
    if (pageName === 'selectService') {
      this.page = this.pages[1];
    }
    if (pageName === 'dateTime') {
      this.page = this.pages[2];
    }

    this.checkStatusOfContinue();
  }

  checkStatusOfContinue(): void {
    console.warn('checking status of continue');

    console.warn(this.page);
    this.getButtonDisabled.emit(true);

    if (this.page === this.pages[0]) {
      console.warn(this.userDetailsFormGroup.valid);
      if (this.userDetailsFormGroup.valid) {
        this.getButtonDisabled.emit(false);
      }
    }
    if (this.page === this.pages[1]) {
      console.warn('in page 1');
      if (this.servicesFormGroup.get('service')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
    }
    if (this.page === this.pages[2]) {
      if (this.calendarFormGroup.get('calendar')?.value !== null && this.calendarFormGroup.get('time')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
    }
  }

  checkSubmitDisabled(): void {
    if (
      this.userDetailsFormGroup.valid &&
      this.servicesFormGroup.get('service')?.value !== '' &&
      this.calendarFormGroup.get('calendar')?.value !== null &&
      this.calendarFormGroup.get('time')?.value !== ''
    ) {
      this.getSubmitDisabled.emit(false);
    } else {
      this.getSubmitDisabled.emit(true);
    }
  }

  // submitClicked():void {
  //   this.page = "submitted";
  // }

  // isNavDisabled(page:string):boolean {
  //   console.warn(page)
  //   if(this.page === this.pages[1]){
  //     console.warn('in here')
  //     if(this.userDetailsFormGroup.valid) {
  //       return false;
  //     }
  //   }
  //   if(this.page === this.pages[2]){
  //     console.warn('in here2')

  //     if(this.servicesFormGroup.get('service')?.value !== '') {
  //       return false;
  //     }
  //   }
  //   return true;
  // }
}
