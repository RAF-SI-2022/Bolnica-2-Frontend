import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { SearchedEmployee, SearchEmployeesResponse } from 'src/app/dto/response/employee.response';
import { EmployeesService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-edit-shifts',
  templateUrl: './edit-shifts.component.html',
  styleUrls: ['./edit-shifts.component.css']
})
export class EditShiftsComponent implements OnInit {
  editShiftsForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  paginatedEmployees: SearchedEmployee[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private employeesService: EmployeesService,
              private toast: HotToastService,
              private modalService: NgbModal) {
    this.editShiftsForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [''],
      title: [''],
      profession: [''],
      phone: [''],
      email: [''],
      departmentName: [''],
      shifts: this.formBuilder.array([])
    });
    this.refreshEmployees();
  }

  ngOnInit(): void {

  }

  search(): void {
    this.refreshEmployees();
  }

  refreshEmployees(): void {
    const val = this.editShiftsForm.value;
    this.employeesService.searchEmployees({
      firstName: val.firstName,
      lastName: val.lastName,
      dateOfBirth: val.dateOfBirth,
      title: val.title,
      profession: val.profession,
      phone: val.phone,
      email: val.email,
      departmentName: val.departmentName,
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        const response = res as SearchEmployeesResponse;
        console.log(response);
        this.paginatedEmployees = response.userList;
        this.collectionSize = response.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  shiftsOptions = [
    { label: 'Choose...', value: '' },
    { label: 'Prva', value: 'Prva' },
    { label: 'Druga', value: 'Druga' },
    { label: 'Treća', value: 'Treća' },
    { label: 'Međusmena', value: 'Međusmena' },
    { label: 'Slobodan dan', value: 'Slobodan dan' },
  ];
  
  get shifts(): FormArray {
    return this.editShiftsForm.get('shifts') as FormArray;
  }

  addShift() {
  this.shifts.push(this.formBuilder.group({ shift: '' }));
}

  saveShifts() {
    if (this.editShiftsForm.valid) {
      // Send this data to the server
    }
  }
}
