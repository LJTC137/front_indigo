import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRentComponent } from './list-rent/list-rent.component';
import { FormRentComponent } from './form-rent/form-rent.component';
import { RentRoutingModule } from './rent-routing.module';
import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from '@coreui/icons-angular';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ListRentComponent, FormRentComponent],
  imports: [
    CommonModule,
    RentRoutingModule,
    GridModule,
    CardModule,
    FormModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    IconModule,
    NgSelectModule,
    TableModule,
    UtilitiesModule,
    ModalModule,
  ],
})
export class RentModule {}
