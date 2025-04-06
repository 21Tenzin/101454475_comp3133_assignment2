import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CREATE_EMPLOYEE } from '../../graphql/graphql.queries';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [null, Validators.required],
      picture: [null]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.apollo.mutate({
        mutation: CREATE_EMPLOYEE,
        variables: this.employeeForm.value
      }).subscribe({
        next: () => this.router.navigate(['/']),
        error: (err) => console.error('Error creating employee:', err)
      });
    }
  }
}
