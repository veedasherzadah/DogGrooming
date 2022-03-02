import { NONE_TYPE } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDetailsFormComponent } from '../modal-details-folder/modal-details-form/modal-details-form.component';

@Component({
  selector: 'jhi-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  buttonDisabled = true;
  submitDisabled = true;
  navDisabled = false;
  display = 'none';
  personalForm: any;
  serviceForm: any;
  scheduleForm: any;

  pages = ['enterDetails', 'selectService', 'dateTime'];
  pageNav = this.pages[0];

  pagesFormGroup!: FormGroup;

  @ViewChild('formComponent')
  private child: ModalDetailsFormComponent | undefined;

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.pagesFormGroup.statusChanges.subscribe(res => {
      // console.warn(this.pagesFormGroup.get('page')?.value)
      this.pageNav = this.pagesFormGroup.get('page')?.value;
      this.child?.changeModalPage(this.pagesFormGroup.get('page')?.value);
    });
  }

  createForm(): void {
    this.pagesFormGroup = this.fb.group({
      page: new FormControl(
        {
          value: this.pageNav,
          // disabled: this.navDisabled
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
    // this.submitDisabled = true;
    this.navDisabled = false;
    // this.pageNav = this.pages[0];
  }

  backClicked(): void {
    console.warn('back clicked');
    const index = this.pages.indexOf(this.pageNav);
    this.pageNav = this.pages[index - 1];
    this.pagesFormGroup.get('page')?.setValue(this.pageNav);
    // console.warn(this.pageNav);
    this.child?.continueClicked(this.pageNav);
  }
  continueClicked(): void {
    // console.warn(this.pageNav);

    const index = this.pages.indexOf(this.pageNav);
    this.pageNav = this.pages[index + 1];
    this.pagesFormGroup.get('page')?.setValue(this.pageNav);
    // console.warn(this.pageNav);
    this.child?.continueClicked(this.pageNav);
  }

  // isNavDisabled(page:string):boolean {
  //   if(this.child !== undefined) {
  //     return this.child.isNavDisabled(page);
  //   }
  //   return false;
  // }

  submitClicked(): void {
    console.warn('submit clicked');
    console.warn(this.child?.userDetailsFormGroup);
    this.navDisabled = true;
    // this.pagesFormGroup.get('page')?.disable;
    // this.child?.submitClicked();
    this.personalForm = this.child?.userDetailsFormGroup;
    this.serviceForm = this.child?.servicesFormGroup;
    this.scheduleForm = this.child?.calendarFormGroup;
  }
}
