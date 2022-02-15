import { Component, OnInit } from '@angular/core';
import { ModalDetailsFormComponent } from '../modal-details-folder/modal-details-form/modal-details-form.component';

@Component({
  selector: 'jhi-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent{

  // continue = false;
  // constructor() { }

  // ngOnInit(): void {
  // }

  display = "none";


  openModal():void {
    this.display = "block";
    }
    onCloseHandled():void {
    this.display = "none";
    }
}
