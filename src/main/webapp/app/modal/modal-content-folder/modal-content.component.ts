import { Component, Input, OnInit } from '@angular/core';
import { ModalDetailsFormComponent } from '../modal-details-folder/modal-details-form/modal-details-form.component';

@Component({
  selector: 'jhi-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent{
  buttonDisabled = true;
  display = "none";


  setButtonClicked(value: boolean): void{
    this.buttonDisabled = value;
}

  openModal():void {
    this.display = "block";
    }
    onCloseHandled():void {
    this.display = "none";
    }
}
