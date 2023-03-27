import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { PatientService } from "../../service/patient.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent implements OnInit {

  newpatientForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private router: Router,
              private toast: HotToastService) {
    this.newpatientForm = this.formBuilder.group({
      jmbg: ['', Validators.required],
      firstName:['', Validators.required],
      parentName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      deathDate: ['', Validators.required],
      birthplace: ['', Validators.required],
      citizenshipCountry: ['', Validators.required],
      address: ['', Validators.required],
      placeOfLiving: ['', Validators.required],
      countryOfLiving: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      custodianJmbg: ['', Validators.required],
      custodianName: ['', Validators.required],
      familyStatus: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      childrenNum: ['', Validators.required],
      education: ['', Validators.required],
      profession: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  newPatient()
  {
    this.submitted = true;

    if (this.newpatientForm.invalid) {
      return;
    }

    const val = this.newpatientForm.value;
    console.log(val);

    this.patientService.addPatient({
      jmbg: val.jmbg,
      firstName: val.firstName,
      parentName: val.parentName,
      lastName: val.lastName,
      gender: val.gender,
      birthDate: val.birthDate,
      deathDate: val.deathDate,
      birthplace: val.birthplace,
      citizenshipCountry: val.citizenshipCountry,
      address: val.address,
      placeOfLiving: val.placeOfLiving,
      countryOfLiving: val.countryOfLiving,
      phoneNumber: val.phoneNumber,
      email: val.email,
      custodianJmbg: val.custodianJmbg,
      custodianName: val.custodianName,
      familyStatus: val.familyStatus,
      maritalStatus: val.maritalStatus,
      childrenNum: val.childrenNumber,
      education: val.education,
      profession: val.profession
    }).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['']).then(() => {
          this.toast.success('Uspešno ste dodali novog pacijenta');
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage);
      }
    })
  }

}
