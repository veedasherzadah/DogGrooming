import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-modal-details-form',
  templateUrl: './modal-details-form.component.html',
  styleUrls: ['./modal-details-form.component.scss'],
})
export class ModalDetailsFormComponent implements OnInit {
  userDetailsFormGroup!: FormGroup;
  dogDetailsFormGroup!: FormGroup;
  servicesFormGroup!: FormGroup;
  calendarFormGroup!: FormGroup;

  date!: { year: number; month: number };
  minDate!: NgbDate;
  maxDate!: NgbDate;

  calendarValid = false;
  editClicked = false;

  pages = ['yourDetails', 'dogDetails', 'selectService', 'dateTime'];
  page = this.pages[0];

  dogList: any[] = [];
  name = '';

  selectedDay!: NgbDateStruct;
  now = new Date();
  model!: Date;

  @Output() getButtonDisabled = new EventEmitter<boolean>();
  @Output() getSubmitDisabled = new EventEmitter<boolean>();

  public keyword = 'name';

  Services: Array<any> = [
    { 
      label: 'Full Cut', 
      bio: '$50.00 - 1 Hour', 
      value: 'Full Cut', 
      desc: 'Typical shave leaving a 1/2 inch of hair or less.' },
    {
      label: 'Half Cut',
      bio: '$30.00 - 30 Minutes',
      value: 'Half Cut',
      desc: 'Clippers and scissoring used to trim hair to 1/2 an inch or longer.',
    },
    {
      label: 'Bath',
      bio: '$40.00 - 30 Minutes',
      value: 'Bath',
      desc: 'A full body bath with shampoo and hair drying.',
    },
    {
      label: 'Bath and Cut',
      bio: '$60.00 - 1 Hour',
      value: 'Bath and Cut',
      desc: 'A full body bath followed by a Half Cut; trim hair to 1/2 an inch or longer.',
    },
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
  constructor(private fb: FormBuilder, private calendar: NgbCalendar, private http: HttpClient) {
    this.createForm();

    if (localStorage.getItem('userDetailsFormGroup')) {
      this.setForms();
    }
    this.minDate = calendar.getToday();
    this.maxDate = calendar.getNext(this.minDate, 'm', 6);
    this.userDetailsFormGroup.statusChanges.subscribe(res => {
      // console.warn(this.userDetailsFormGroup)
      this.getButtonDisabled.emit(res === 'INVALID');
      this.checkSubmitDisabled();
    });

    this.dogDetailsFormGroup.statusChanges.subscribe(res => {
      this.getButtonDisabled.emit(res === 'INVALID');
      this.checkSubmitDisabled();
    });

    this.servicesFormGroup.statusChanges.subscribe(res => {
      if (this.servicesFormGroup.get('service')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
      this.checkSubmitDisabled();
    });
    this.calendarFormGroup.statusChanges.subscribe(res => {
      if (this.calendarFormGroup.get('calendar')?.value !== undefined) {
        this.calendarValid = true;
      }

      if (this.calendarFormGroup.get('calendar')?.value !== null && this.calendarFormGroup.get('time')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
      this.checkSubmitDisabled();
    });
  }

  ngOnInit(): void {
    this.getDogBreeds();
    // this.editClicked = false;
    localStorage.clear();
  }
  
  createForm(): void {
    this.userDetailsFormGroup = this.fb.group({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
        updateOn: 'blur',
      }),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, {
        updateOn: 'blur',
      }),
    });

    this.dogDetailsFormGroup = this.fb.group({
      dogName: new FormControl(null, [Validators.required]),
      dogSelect: new FormControl(null, [Validators.required]),
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


  selectEvent($event: any): void {
    document.getElementById('select')!.className = 'select';
  }
  clearedEvent($event: any):void {
    document.getElementById('select')!.classList.add('select-icon');
  }

  continueClicked(page: string): void {
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
    if (pageName === 'yourDetails') {
      this.page = this.pages[0];
    }
    if (pageName === 'dogDetails') {
      this.page = this.pages[1];
    }
    if (pageName === 'selectService') {
      this.page = this.pages[2];
    }
    if (pageName === 'dateTime') {
      this.page = this.pages[3];
    }

    this.checkStatusOfContinue();
  }

  checkStatusOfContinue(): void {
    this.getButtonDisabled.emit(true);

    if (this.page === this.pages[0]) {
      if (this.userDetailsFormGroup.valid) {
        this.getButtonDisabled.emit(false);
      }
    }
    if (this.page === this.pages[1]) {
      if (this.dogDetailsFormGroup.valid) {
        this.getButtonDisabled.emit(false);
      }
    }
    if (this.page === this.pages[2]) {
      if (this.servicesFormGroup.get('service')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
    }
    if (this.page === this.pages[3]) {
      if (this.calendarFormGroup.get('calendar')?.value !== null && this.calendarFormGroup.get('time')?.value !== '') {
        this.getButtonDisabled.emit(false);
      }
    }
  }

  checkSubmitDisabled(): void {
    if (
      this.userDetailsFormGroup.valid &&
      this.dogDetailsFormGroup.valid &&
      this.servicesFormGroup.get('service')?.value !== '' &&
      this.calendarFormGroup.get('calendar')?.value !== null &&
      this.calendarFormGroup.get('time')?.value !== ''
    ) {
      this.getSubmitDisabled.emit(false);
    } else {
      this.getSubmitDisabled.emit(true);
    }
  }

  getDogBreeds(): void {
    this.dogList.push({ name: 'Mixed breed / Unknown' });
    this.http.get<any[]>('https://api.thedogapi.com/v1/breeds').subscribe(data => {
      data.forEach(dog => {
        this.dogList.push(dog);
      });
    });
  }

  setForms(): void {
    console.warn('resetting forms');
    this.patchUserDetailsFormGroup(JSON.parse(localStorage.getItem('userDetailsFormGroup')!), JSON.parse(localStorage.getItem('dogDetailsFormGroup')!));
    this.patchServicesFormGroup(JSON.parse(localStorage.getItem('serviceFormGroup')!));
    this.patchCalendarFormGroup(JSON.parse(localStorage.getItem('calendarFormGroup')!));
  }

  patchUserDetailsFormGroup(userDetailsFormGroup: any, dogDetailsFormGroup: any): void {
    this.userDetailsFormGroup.patchValue({
      email: userDetailsFormGroup.email,
      firstName: userDetailsFormGroup.firstName,
      lastName: userDetailsFormGroup.lastName,
      phone: userDetailsFormGroup.phone
    });

    this.dogDetailsFormGroup.patchValue({
      dogName: dogDetailsFormGroup.dogName,
      dogSelect: dogDetailsFormGroup.dogSelect,
    });
    if (dogDetailsFormGroup.dogSelect.name === undefined) {
      this.name = dogDetailsFormGroup.dogSelect;
    } else {
      this.name = dogDetailsFormGroup.dogSelect.name;
    }
  }

  patchServicesFormGroup(servicesFormGroup: any): void {
    this.servicesFormGroup.patchValue({
      service: servicesFormGroup.service,
    });
  }

  patchCalendarFormGroup(calendarFormGroup: any): void {
    this.calendarFormGroup.patchValue({
      calendar: calendarFormGroup.calendar,
      time: calendarFormGroup.time,
    });
    this.model = calendarFormGroup.calendar;
  }

  regenerateForm(): void {
    console.warn('in regnerate form');
  }
}
