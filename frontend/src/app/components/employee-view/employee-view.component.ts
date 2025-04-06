import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../../graphql/graphql.queries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.apollo.query({
      query: GET_EMPLOYEE_BY_ID,
      variables: { id }
    }).subscribe((result: any) => {
      this.employee = result.data.employee;
    });
  }
}
