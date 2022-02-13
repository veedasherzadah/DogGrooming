import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {

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
