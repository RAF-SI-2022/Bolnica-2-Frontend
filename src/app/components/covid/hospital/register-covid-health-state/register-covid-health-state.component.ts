import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-register-covid-health-state',
  templateUrl: './register-covid-health-state.component.html',
  styleUrls: ['./register-covid-health-state.component.css']
})
export class RegisterCovidHealthStateComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  lbp: string = '';

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: HotToastService) {
    this.form = this.formBuilder.group({
      respirator: [''],
      temperature: [''],
      preassure: [''],
      pulse: [''],
      therapy: [''],
      desc: [''],
      dateCollected:['', Validators.required]
    })

    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
    })
  }

  ngOnInit(): void {
  }

  newCondition() {
    this.submitted = true;

    console.log(this.form)

    if (this.form.invalid) {
      return;
    }

    const value = this.form.value;

    this.patientService.registerPatientsCondition({
      collectedInfoDate: value.dateCollected,
      temperature: value.temperature,
      bloodPressure: value.preassure,
      pulse: value.pulse,
      appliedTherapies: value.therapy,
      description: value.desc,
      onRespirator: value.respirator
    }, this.lbp).subscribe({
      next: (res) => {
        this.router.navigate(['covid/hospital']).then(() => {
          this.toast.success('Uspešno ste registrovali novo stanje pacijenta');
        })
      }
    })
  }

}
