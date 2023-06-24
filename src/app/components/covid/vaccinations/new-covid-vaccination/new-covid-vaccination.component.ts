import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { HealthRecordService } from 'src/app/service/health-record.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-new-covid-vaccination',
  templateUrl: './new-covid-vaccination.component.html',
  styleUrls: ['./new-covid-vaccination.component.css']
})
export class NewCovidVaccinationComponent implements OnInit {

  form: FormGroup;

  lbp: string = '';
  scheduledId: number = -1;

  patient: any;
  allergies: any;
  dosesSoFar: string = '/';

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
      description: [''],
      date: [''],
      vaccine: ['']
    })

    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;
      this.scheduledId = params.id;

      this.patientService.getPatientByLbp(this.lbp).subscribe({
        next: (res) => {
          this.patient = res as any;
        }
      })

      this.patientService.getReceivedVaccinationDosage(this.lbp).subscribe({
        next: (res) => {
          this.dosesSoFar = (res as any).dosageReceived;
        }
      })

      this.healthRecordService.getRecord(this.lbp).subscribe({
        next: (res) => {
          this.allergies = (res as any).allergies.allergies;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const value = this.form.value;
    console.log(value);

    const date = new Date();
    date.setDate(date.getDate() - 1);

    this.patientService.newCovidVaccination({
      lbp: this.lbp,
      scheduledId: this.scheduledId,
      vaccineName: value.vaccine,
      doseReceived: this.dosesSoFar + 1,
      dateTime: this.datePipe.transform(date, 'yyyy-MM-dd 00:00:00')
    }).subscribe({
      next: (res) => {
        this.router.navigate(['covid/vaccinations']).then(() => {
          this.toast.success('Vakcinacija uspešno sačuvana!');

          this.patientService.changeCovidVaccinationStatus(this.scheduledId, 'U toku').subscribe({
            next: () => {}
          })
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

}
