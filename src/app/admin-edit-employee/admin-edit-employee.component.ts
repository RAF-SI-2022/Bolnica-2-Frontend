import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../service/employee.service';

@Component({
  selector: 'app-admin-edit-employee',
  templateUrl: './admin-edit-employee.component.html',
  styleUrls: ['./admin-edit-employee.component.css']
})
export class AdminEditEmployeeComponent implements OnInit {
  adminEditEmployeeForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private emloyeesService: EmployeesService) {
    this.adminEditEmployeeForm = this.formBuilder.group({

    })
  }

  ngOnInit(): void {
  }

}
