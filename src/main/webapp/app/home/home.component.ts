import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  // myModal = document.getElementById('myModal')
  // myInput = document.getElementById('myInput')
  // display = "none";

  

  private readonly destroy$ = new Subject<void>();

  constructor(private accountService: AccountService, private router: 
    Router,
    // config: NgbModalConfig, private modalService: NgbModal
    ) {
      // config.backdrop = 'static';
      // config.keyboard = false;
  }

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));

      // this.myModal?.addEventListener('shown.bs.modal',  () => {
      //   this.myInput?.focus()
      // })
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
