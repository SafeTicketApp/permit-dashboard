import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PermitCodeService } from '../../providers/permit-code.service';
import { PermitCode } from '../../interfaces/permit-code';

interface CreatePermitState {
  reasonId: string;
  amount: number;
}

@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
  styleUrls: ['./create.scss'],
})
export class CreatePermitPage {
  permit: CreatePermitState = { reasonId: '', amount: 1 };
  submitted = false;

  constructor(
    public permitService: PermitCodeService,
    public router: Router
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.permitService.createPermitCode(this.permit.reasonId).then((permit) => {
        const permitCode: PermitCode = { reasonAbbrevation: permit.reasonAbbrevation, code: permit.code };
        this.router.navigate(['/permits/code'], { state:  permitCode});
      }).catch(err => {
        window.alert(err);
      });
    }
  }
}
