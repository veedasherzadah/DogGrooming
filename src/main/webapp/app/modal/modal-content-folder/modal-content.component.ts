import { NONE_TYPE } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDetailsFormComponent } from '../modal-details-folder/modal-details-form/modal-details-form.component';

@Component({
  selector: 'jhi-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit{
  buttonDisabled = true;
  submitDisabled = true;
  navDisabled = false;
  isReview = false;
  isSubmit = false;
  display = 'none';
  personalForm: any;
  serviceForm: any;
  scheduleForm: any;
  dateSelected= '';

  pages = ['enterDetails', 'selectService', 'dateTime'];
  pageNav = this.pages[0];

  pagesFormGroup!: FormGroup;

  @ViewChild('formComponent')
  private child: ModalDetailsFormComponent | undefined;
  private childCopy: ModalDetailsFormComponent | undefined;


  constructor(private fb: FormBuilder) {
    this.createForm();
    this.pagesFormGroup.statusChanges.subscribe(res => {
      this.pageNav = this.pagesFormGroup.get('page')?.value;
      this.child?.changeModalPage(this.pagesFormGroup.get('page')?.value);
    });
  }
  ngOnInit(): void {
    this.isReview = false;
    this.isSubmit = false;
  }

  createForm(): void {
    this.pagesFormGroup = this.fb.group({
      page: new FormControl(
        {
          value: this.pageNav,
        },
        [Validators.required]
      ),
    });
  }

  setButtonClicked(value: boolean): void {
    this.buttonDisabled = value;
  }

  setSubmitClicked(value: boolean): void {
    this.submitDisabled = value;
  }

  openModal(): void {
    this.display = 'block';
    this.pageNav = this.pages[0];
    this.pagesFormGroup.get('page')?.setValue(this.pageNav);
  }
  onCloseHandled(): void {
    this.display = 'none';
    this.buttonDisabled = true;
    this.navDisabled = false;
  }

  backClicked(): void {
    console.warn('back clicked');
    const index = this.pages.indexOf(this.pageNav);
    this.pageNav = this.pages[index - 1];
    this.pagesFormGroup.get('page')?.setValue(this.pageNav);
    this.child?.continueClicked(this.pageNav);
  }
  continueClicked(): void {
    const index = this.pages.indexOf(this.pageNav);
    this.pageNav = this.pages[index + 1];
    this.pagesFormGroup.get('page')?.setValue(this.pageNav);
    this.child?.continueClicked(this.pageNav);
  }


  reviewClicked(): void {
    console.warn('review clicked');
    this.navDisabled = true;
    this.isReview = true;
    this.isSubmit = false
    this.childCopy = this.child;

    localStorage.clear
    this.personalForm = Object.assign({}, this.child?.userDetailsFormGroup);
    this.serviceForm = Object.assign({}, this.child?.servicesFormGroup);
    this.scheduleForm = Object.assign({}, this.child?.calendarFormGroup);
    const date = this.scheduleForm.value.calendar
    this.dateSelected = date.format('MMM/DD/YYYY');
  }

  submitClicked(): void {
    console.warn('submit clicked');
    this.navDisabled = true;
    this.isReview = false;
    this.isSubmit = true;
    localStorage.clear();
  }

  editBackClicked(): void {
    console.warn('edit back clicked')
    // console.warn(this.personalForm)
    localStorage.setItem('userDetailsFormGroup', JSON.stringify(this.personalForm.value));
    localStorage.setItem('serviceFormGroup', JSON.stringify(this.serviceForm.value));
    localStorage.setItem('calendarFormGroup', JSON.stringify(this.scheduleForm.value));

    // localStorage.setItem('userDetailsFormGroup', JSON.stringify(personal));

    this.navDisabled = false;
    this.isReview = false;
    this.isSubmit = false;
    this.pageNav = this.pages[0];
    this.pagesFormGroup.get('page')?.setValue(this.pageNav);
    // this.childCopy?.setForms();
    this.child?.regenerateForm();
  }
}
