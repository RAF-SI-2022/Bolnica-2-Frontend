import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../service/employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  newemployeeForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private employeesService: EmployeesService) {
    this.newemployeeForm = this.formBuilder.group({
      ime: ['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      pol:['',Validators.required],
      prezime: ['', Validators.required],
      datumrodjenja: ['', Validators.required],
      jmbg: ['', Validators.required],
      adresastanovanja: ['', Validators.required],
      mestostanovanja: ['', Validators.required],
      kontakttel: [''],
      adminPriv: [''],
      nacelnik: [''],
      doktorSpec: [''],
      doktorSpecPov: [''],
      medSestra: [''],
      medSestraVisa: ['']
    })
  }

  ngOnInit(): void {
  }

  newEmployee()
  {
    this.submitted = true;

    if (this.newemployeeForm.invalid) {
      return;
    }

    const val = this.newemployeeForm.value;
    console.log(val);

    this.employeesService.addNewEmployee({
      firstName: val.ime,
      lastName: val.prezime,
      dateOfBirth: val.datumrodjenja,
      gender: val.pol,
      jmbg: val.jmbg,
      residentialAddress: val.adresastanovanja,
      placeOfLiving: val.mestostanovanja,
      phone: val.kontakttel,
      email: val.email,
      title: "Prof. dr. med.",
      profession: "Med. sestra",
      departmentId: 1,
      permissions: ["Administrator"]
    }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
