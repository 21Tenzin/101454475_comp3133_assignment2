import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import gql from 'graphql-tag';

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        _id
        email
      }
    }
  }
`;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private apollo: Apollo, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.apollo.mutate({
        mutation: SIGNUP,
        variables: this.signupForm.value
      }).subscribe({
        next: () => {
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        error: err => console.error('Signup error', err)
      });
    }
  }
}
