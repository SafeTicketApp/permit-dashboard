import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePermitPage } from './create';
import { GeneratedCodePage } from './generated';

const routes: Routes = [
  {
    path: 'create',
    component: CreatePermitPage,
  },
  {
    path: 'code',
    component: GeneratedCodePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermitsPageRoutingModule { }
