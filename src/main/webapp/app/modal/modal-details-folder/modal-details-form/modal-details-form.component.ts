import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-modal-details-form',
  templateUrl: './modal-details-form.component.html',
  styleUrls: ['./modal-details-form.component.scss']
})
export class ModalDetailsFormComponent {
  // @Input() continue; 
  continue = false;
  formGroup!: FormGroup;

  ngOnInit() :void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      phone: new FormControl('', [
        Validators.required
      ])
    });
  }
  continueClicked():void {
    this.continue = true;
    console.warn(this.formGroup);
  }

  onSubmit():void{
    this.continue = true;
    console.warn(this.formGroup);
  }
}