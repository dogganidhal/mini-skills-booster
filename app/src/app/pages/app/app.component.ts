import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private subscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit() {
    this.subscription = this.authService.isConnected
      .pipe(tap(connected => {
        if (connected) {
          this.router.navigateByUrl('');
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
