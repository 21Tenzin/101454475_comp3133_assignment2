import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { RouterModule } from '@angular/router';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../../graphql/graphql.queries';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  searchTerm: string = '';
  allEmployees: any[] = [];
  employees: any[] = [];
  error: any;

  constructor(private apollo: Apollo) {}

  loading = false;
  ngOnInit(): void {
    this.loading = true;
    this.apollo.watchQuery({
      query: GET_EMPLOYEES
    }).valueChanges.subscribe((result: any) => {
      this.allEmployees = result.data.employees;
      this.employees = [...this.allEmployees];
      this.error = result.error;
      this.loading = false;
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
  
    this.employees = this.allEmployees.filter((emp) =>
      emp.department.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term)
    );
  }

  deleteEmployee(id: string): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;
  
  this.apollo.mutate({
    mutation: DELETE_EMPLOYEE,
    variables: { id },
    refetchQueries: [{ query: GET_EMPLOYEES }]
  }).subscribe(() => {
    console.log('Deleted');
  });
  }
}
