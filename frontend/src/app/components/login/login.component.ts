import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { gql } from 'apollo-angular';
import { CommonModule } from '@angular/common';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        _id
        email
      }
    }
  }
`;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password }
      }).subscribe({
        next: ({ data }: any) => {
          if (data.login.user) {
            localStorage.setItem('user', JSON.stringify(data.login.user));
            this.router.navigate(['/employees']);
          } else {
            this.errorMessage = data.login.message;
          }
        },
        error: (err) => {
          this.errorMessage = 'Login failed. Please try again.';
          console.error(err);
        }
      });
    }
  }
}
