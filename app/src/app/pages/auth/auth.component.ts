import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit() {
    this.subscription = this.authService.isConnected
      .pipe(tap(connected => {
        console.log('connected : ', connected)
        if (connected) {
          this.router.navigateByUrl('quiz');
        } else {
          this.router.navigateByUrl('auth');
        }
      }))
      .subscribe()
  }

  public ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
