import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-shifts',
  templateUrl: './employee-shifts.component.html',
  styleUrls: ['./employee-shifts.component.css']
})
export class EmployeeShiftsComponent implements OnInit {
  employees: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private employeeService: EmployeesService) {
    this.employeeService.getSubordinates(this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.employees = (res as any).userList;
        this.collectionSize = (res as any).count;
      }
    })
  }

  ngOnInit(): void {
  }

  search() {

  }

}
