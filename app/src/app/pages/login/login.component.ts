import {Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loading: boolean = false;
  public email: string = '';
  public password: string = '';
  public errors: any[] = [];

  constructor(private authService: AuthService) { }

  public submit() {
    if (this.email.length > 0 && this.password.length > 0) {
      this.errors = [];
      this.loading = true;
      this.authService.login({
        email: this.email,
        password: this.password
      })
        .toPromise()
        .catch(e => this.errors = [{severity: 'error', summary: 'Error: ', detail: e.toString()}])
        .finally(() => this.loading = false);
    }
  }

}
