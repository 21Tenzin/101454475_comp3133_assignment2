import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE } from '../../graphql/graphql.queries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;

    this.employeeForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
    });

    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id: this.employeeId }
    }).subscribe((result: any) => {
      const employee = result.data.employee;
      this.employeeForm.patchValue(employee);
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.apollo.mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.employeeId,
          ...this.employeeForm.value
        }
      }).subscribe(() => {
        alert('Employee updated!');
        this.router.navigate(['/employees']);
      });
    }
  }
}
