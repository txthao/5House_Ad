import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertComponent } from './directives/alert.component';

// Component


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),

  ],
  declarations: [    
     AlertComponent
  ],
  exports: [
     AlertComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
