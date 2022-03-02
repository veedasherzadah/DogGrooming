import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { ModalContentComponent } from 'app/modal/modal-content-folder/modal-content.component';
import { ModalDetailsFormComponent } from './modal-details-folder/modal-details-form/modal-details-form.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [SharedModule, AutocompleteLibModule],
  exports: [ModalContentComponent, ModalDetailsFormComponent],
  declarations: [ ModalContentComponent, ModalDetailsFormComponent],
})
export class ModalModule {}
