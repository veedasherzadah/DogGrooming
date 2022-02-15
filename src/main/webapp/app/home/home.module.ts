import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { ModalModule } from 'app/modal/modal.module';
import { ModalContentComponent } from 'app/modal/modal-content-folder/modal-content.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), ModalModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
