import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  newemployeeForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder) {
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
      medSestraVisa: [''],
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

    alert('servis ');
  }

}
