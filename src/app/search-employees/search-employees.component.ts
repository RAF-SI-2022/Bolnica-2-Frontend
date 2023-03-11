import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {
  searchEmployeesForm: FormGroup;

  page = 1;
  pageSize = 10;
  collectionSize = 100;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    this.searchEmployeesForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      ward: [''],
      hospital: [''],
      deleted: [false]
    })
  }

  ngOnInit(): void {
  }

  search(): void {
    const val = this.searchEmployeesForm.value;
    alert(val.firstName + ' ' + val.lastName + ' ' + val.ward + ' ' + val.hospital + ' ' + val.deleted);
  }
}
