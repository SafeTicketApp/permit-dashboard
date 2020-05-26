import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserData } from '../../providers/user-data';
import { PermitCode } from '../../interfaces/permit-code';

export interface GeneratedPermitCode {
  reasonAbbrevation: string;
  code: number;
}

@Component({
  selector: 'page-generated',
  templateUrl: 'generated.html',
  styleUrls: ['./generated.scss'],
})
export class GeneratedCodePage implements OnInit {
  generated: GeneratedPermitCode = { reasonAbbrevation: null, code: null };
  error: string = null;
  submitted = false;

  constructor(
    private router: Router,
    public userData: UserData,
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state) {
      const routerState = nav.extras.state as PermitCode;
      console.log('ngOnInit router extras state', routerState);

      this.generated = {
        reasonAbbrevation: routerState.reasonAbbrevation,
        code: Number(routerState.code),
      };
    } else {
      this.error = 'missing data - response failed';
    }
  }
}
