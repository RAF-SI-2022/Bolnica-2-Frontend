import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  editPatient: FormGroup;

  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private patientService:PatientService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private datePipe: DatePipe,
    private router:Router) {
      this.editPatient = this.formBuilder.group({
        jmbg: ['', Validators.required],
        firstName: ['', Validators.required],
        parentName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        birthDate: ['', Validators.required],
        deathDate: [''],
        deathHour: [''],
        deathMinute: [''],
        birthplace: ['', Validators.required],
        citizenshipCountry: ['', Validators.required],
        address: [''],
        placeOfLiving: [''],
        countryOfLiving: ['', [Validators.required, Validators.pattern('[A-Z]{3}')]],
        phoneNumber: [''],
        email: ['', [Validators.required, Validators.email]],
        custodianJmbg: [''],
        custodianName: [''],
        familyStatus: [''],
        maritalStatus: [''],
        childrenNum: [''],
        education: [''],
        profession: [''],
      });

     }

  ngOnInit(): void {
    const lbp = this.route.snapshot.paramMap.get('lbp');
    if(lbp)
      this.patientService.getPatientByLbp(lbp).subscribe({
        next: (res) => {
          this.editPatient.get('jmbg')?.setValue(res.jmbg);
          this.editPatient.get('firstName')?.setValue(res.firstName);
          this.editPatient.get('parentName')?.setValue(res.parentName);
          this.editPatient.get('lastName')?.setValue(res.lastName);
          this.editPatient.get('gender')?.setValue(res.gender.notation);
          this.editPatient.get('birthDate')?.setValue(this.datePipe.transform(res.birthDate, 'yyyy-MM-dd'));
          this.editPatient.get('deathDate')?.setValue(this.datePipe.transform(res.deathDate, 'yyyy-MM-dd'));
          if(res.deathDate){
            this.editPatient.get('deathHour')?.setValue((res.deathDate).toString().split("T")[1].split(":")[0]);
            this.editPatient.get('deathMinute')?.setValue((res.deathDate).toString().split("T")[1].split(":")[1]);
          }
          this.editPatient.get('birthplace')?.setValue(res.birthplace);
          this.editPatient.get('citizenshipCountry')?.setValue(res.citizenshipCountry);
          this.editPatient.get('address')?.setValue(res.address);
          this.editPatient.get('placeOfLiving')?.setValue(res.placeOfLiving);
          this.editPatient.get('countryOfLiving')?.setValue(res.countryOfLiving);
          this.editPatient.get('phoneNumber')?.setValue(res.phoneNumber);
          this.editPatient.get('email')?.setValue(res.email);
          this.editPatient.get('custodianJmbg')?.setValue(res.custodianJmbg);
          this.editPatient.get('custodianName')?.setValue(res.custodianName);

          this.editPatient.get('familyStatus')?.setValue(res.familyStatus.notation);
          this.editPatient.get('maritalStatus')?.setValue(res.maritalStatus.notation);
          this.editPatient.get('childrenNum')?.setValue(res.childrenNum);
          this.editPatient.get('education')?.setValue(res.education.notation);
          this.editPatient.get('profession')?.setValue(res.profession);
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage);
        }
      });
  }
  save():void{
    this.submitted=true;
    if (this.editPatient.invalid) 
      return;
    
    const lbp = this.route.snapshot.paramMap.get('lbp');
    const val = this.editPatient.value;
    let deathDate=new Date(val.deathDate);
    deathDate.setHours(val.deathHour);
    deathDate.setMinutes(val.deathMinute);

    
    if(lbp){
      this.patientService.updatePatientByLbp(lbp,{
        jmbg: val.jmbg,
        firstName: val.firstName,
        parentName: val.parentName,
        lastName: val.lastName,
        gender: val.gender,
        birthDate: val.birthDate,
        deathDate: deathDate,
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
        childrenNum: val.childrenNum,
        education: val.education,
        profession: val.profession,
        }
        ).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/search-patients']).then(() => {
            this.toast.success('Uspešno ste ažurirali zaposlenog');
          })
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage);
        }
      })
    }

  }

}

