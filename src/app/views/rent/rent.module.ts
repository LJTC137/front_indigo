import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRentComponent } from './list-rent/list-rent.component';
import { FormRentComponent } from './form-rent/form-rent.component';
import { RentRoutingModule } from './rent-routing.module';
import {
  AccordionModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  FormModule,
  GridModule,
  ModalModule,
  SharedModule,
  TableModule,
  UtilitiesModule,
} from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule } from '@coreui/icons-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListRentComponent, FormRentComponent],
  imports: [
    CommonModule,
    RentRoutingModule,
    GridModule,
    CardModule,
    CarouselModule,
    FormModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    IconModule,
    NgSelectModule,
    TableModule,
    UtilitiesModule,
    ModalModule,
    HttpClientModule,
    AccordionModule,
    SharedModule,
  ],
})
export class RentModule {}
