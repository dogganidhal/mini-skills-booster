import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy, OnInit {

  private subscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  public ngOnInit() {
    // TODO: Find a way to refactor this repeated code
    this.subscription = this.authService.isConnected
      .pipe(tap(connected => {
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
