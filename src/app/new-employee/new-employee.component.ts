import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
              private employeesService: EmployeesService,
              private router: Router,
              private toast: HotToastService) {
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
      privilegije: new FormArray([], [Validators.required]),
      titula: ['', Validators.required],
      odeljenje: ['', Validators.required],
      zanimanje: ['', Validators.required]
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
      title: val.titula,
      profession: val.zanimanje,
      departmentId: val.odeljenje,
      permissions: val.privilegije
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']).then(() => {
          this.toast.success('Uspešno ste dodali novog zaposlenog');
        })
      },
      error: (e) => {
        if (e.error.errorMessage === 'Korisnik sa datim email-om vec postoji') {
          this.toast.error('Korisnik sa datim email-om vec postoji');
        }
      }
    })
  }

  onPrivilegijeCheckboxChange(event: any) {
    const selectedPrivileges = (this.newemployeeForm.controls['privilegije'] as FormArray);
    if (event.target.checked) {
      selectedPrivileges.push(new FormControl(event.target.value));
    } else {
      const index = selectedPrivileges.controls.findIndex(x => x.value === event.target.value);
      selectedPrivileges.removeAt(index);
    }
  }
}
