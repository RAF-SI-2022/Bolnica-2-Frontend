import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  newemployeeForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.newemployeeForm = this.formBuilder.group({
      ime: ['', Validators.required],
      email:['',Validators.required],
      polm:[false,Validators.required],
      polz:[false,Validators.required],
      prezime: ['', Validators.required],
      datumrodjenja: ['', Validators.required],
      jmbg: ['', Validators.required],
      adresastanovanja: ['', Validators.required],
      mestostanovanja: ['', Validators.required],
      kontakttel: ['', Validators.required],
      adminPriv: ['', Validators.required],
      nacelnik: ['', Validators.required],
      doktorSpec: ['', Validators.required],
      doktorSpecPov: ['', Validators.required],
      medSestra: ['', Validators.required],
      medSestraVisa: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  newEmployee()
  {
    alert("Servis")
  }

}
