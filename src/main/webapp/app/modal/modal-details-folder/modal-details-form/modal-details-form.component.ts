import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'jhi-modal-details-form',
  templateUrl: './modal-details-form.component.html',
  styleUrls: ['./modal-details-form.component.scss']
})
export class ModalDetailsFormComponent{
  // @Input() continue; 
  userDetailsFormGroup!: FormGroup;
  servicesFormGroup!: FormGroup;
  showErrors = false;
  pages = ["userDetails", "services"]
  page = this.pages[1];
  @Output() getButtonDisabled = new EventEmitter<boolean>();

  Services: Array<any> = [
    { label: 'Full Cut', bio: '$50.00 - 1 Hour', value: 'fullCut' },
    { label: 'Half Cut', bio: '$30.00 - 30 Minutes', value: 'halfCut' },
    { label: 'Bath and Cut', bio: '$60.00 - 1 Hour', value: 'bathCut' },
  ];

  constructor(private fb: FormBuilder) {
   this.createForm();
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

}