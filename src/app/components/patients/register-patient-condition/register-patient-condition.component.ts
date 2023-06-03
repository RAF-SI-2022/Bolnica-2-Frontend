import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-register-patient-condition',
  templateUrl: './register-patient-condition.component.html',
  styleUrls: ['./register-patient-condition.component.css']
})
export class RegisterPatientConditionComponent implements OnInit {

  newConditionForm:FormGroup
  submitted = false;
  lbp:any;

  constructor(private formBuilder: FormBuilder,private toast: HotToastService,private patientService:PatientService,private route: ActivatedRoute) { 
    this.newConditionForm = this.formBuilder.group({
      temperature: ['', Validators.required],
      preassure: ['', Validators.required],
      pulse: ['', Validators.required],
      therapy: ['', Validators.required],
      desc: ['', Validators.required],
      dateCollected:['',Validators.required]
  }) }

  ngOnInit(): void {
  }
  newCondition(){
    this.submitted = true;

    if (this.newConditionForm.invalid) {
      return;
    }

    const val = this.newConditionForm.value;
    this.lbp = this.route.snapshot.paramMap.get('lbp'); 

    this.patientService.registerPatientsCondition({
      collectedInfoDate:val.dateCollected,
      temperature:val.temperature,
      bloodPressure:val.preassure,
      pulse:val.pulse,
      appliedTherapies:val.therapy,
      description:val.desc,
    },this.lbp).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success('Uspešno ste registrovali novo stanje pacijenta');
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage);
      }
    })
  }
}
