import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CreatePermitPage } from './create';
import { PermitsPageRoutingModule } from './permits-routing.module';
import { GeneratedCodePage } from './generated';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermitsPageRoutingModule
  ],
  declarations: [
    CreatePermitPage,
    GeneratedCodePage,
  ]
})
export class PermitsModule { }
