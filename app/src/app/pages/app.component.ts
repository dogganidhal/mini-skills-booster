import { Component } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isConnected: boolean = false;

  constructor(private authService: AuthService) {
    this.authService.isConnected.subscribe(e => this.isConnected = e);
  }

}
