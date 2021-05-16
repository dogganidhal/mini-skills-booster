import { Component } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService]
})
export class SignUpComponent {

  public loading: boolean = false;
  public email: string = '';
  public fullName: string = '';
  public password: string = '';
  public errors: any[] = [];

  constructor(private authService: AuthService, private messageService: MessageService) { }

  public submit() {
    // TODO: Use proper validation
    if (this.email.length > 0 && this.password.length > 0 && this.fullName.length > 0) {
      this.errors = [];
      this.loading = true;
      this.authService.signUp({
        email: this.email,
        fullName: this.fullName,
        password: this.password
      })
        .toPromise()
        .then(() => this.messageService.add({severity: 'success', summary: 'Success!', detail: 'Sign up successful, please login to your account'}))
        .catch(e => this.errors = [{severity: 'error', summary: 'Error: ', detail: e.toString()}])
        .finally(() => this.loading = false);
    }
  }

}
