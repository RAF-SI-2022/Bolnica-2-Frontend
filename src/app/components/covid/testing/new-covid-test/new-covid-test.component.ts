import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HealthRecordService } from 'src/app/service/health-record.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-new-covid-test',
  templateUrl: './new-covid-test.component.html',
  styleUrls: ['./new-covid-test.component.css']
})
export class NewCovidTestComponent implements OnInit {
  form: FormGroup;

  lbp: string = '';
  scheduledId: number = -1;

  patient: any;
  allergies: any;
  vaccines: any;

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private healthRecordService: HealthRecordService,
    private datePipe: DatePipe,
    private router: Router) {

    this.form = this.formBuilder.group({
      reason: [''],
      temperature: [''],
      bloodPressure: [''],
      pulse: [''],
      appliedTherapies: [''],
      description: ['']
    })

    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
      this.scheduledId = params.id;

      this.patientService.getPatientByLbp(this.lbp).subscribe({
        next: (res) => {
          this.patient = res as any;
        }
      })

      this.healthRecordService.getRecord(this.lbp).subscribe({
        next: (res) => {
          this.vaccines = (res as any).vaccinations.vaccinations;
          this.allergies = (res as any).allergies.allergies;
          console.log(this.vaccines);
        }
      })
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const value = this.form.value;

    const date = new Date();
    date.setDate(date.getDate() - 1);

    this.patientService.newCovidTest({
      lbp: this.lbp,
      scheduledId: this.scheduledId,
      reason: value.reason,
      temperature: value.temperature,
      bloodPressure: value.bloodPressure,
      pulse: value.pulse,
      appliedTherapies: value.appliedTherapies,
      description: value.description,
      date: this.datePipe.transform(date, 'yyyy-MM-dd 00:00:00')
    }).subscribe({
      next: (res) => {
        this.router.navigate(['covid/testing']).then(() => {
          this.toast.success('Testiranje uspešno sačuvano!');

          this.patientService.changeCovidTestStatus(this.scheduledId, 'U toku').subscribe({
            next: () => {

            }
          })
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

}
