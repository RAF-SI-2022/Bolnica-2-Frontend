import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap } from 'rxjs';
import { ReferralResponse } from 'src/app/dto/response/laboratory.response';
import { LabService } from 'src/app/service/lab.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-new-lab-visit',
  templateUrl: './new-lab-visit.component.html',
  styleUrls: ['./new-lab-visit.component.css']
})
export class NewLabVisitComponent implements OnInit {
  model: any;
  patient: any;
  numberOfVisitsForDay: number = 5;
  selectedDate!: Date;

  newLabVisitForm: FormGroup;
  submitted: boolean = false;

  unprocessedReferrals: ReferralResponse[] = [];

  showUnprocessedReferralsTable: boolean = false;

  constructor(private patientService: PatientService,
              private formBuilder: FormBuilder,
              private labService: LabService,
              private toast: HotToastService,
              private router: Router) {
    this.newLabVisitForm = this.formBuilder.group({
      patient: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      note: ['']
    })
  }

  ngOnInit(): void {
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    switchMap((term) =>
      this.patientService.searchPatients({
        firstName: term,
        lastName: '',
        jmbg: '',
        lbp: ''
      }).pipe(map(response => response.patients))
    )
  );

  formatter = (x: {
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: string
  }) => {
    x.firstName,
    x.lastName,
    x.gender,
    x.birthDate
  };

  inputFormatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  onPatientSelected(event: any) {
    this.patient = event.item;
  }

  onDateInputChange(event: any) {
    this.selectedDate = event.target.valueAsDate;
    this.labService.getLabExaminationCount(this.selectedDate.toISOString()).subscribe({
      next: (res) => {
        console.log(res);
        this.numberOfVisitsForDay = res as number;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }
    })
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.newLabVisitForm.get('patient')?.value.lbp === undefined) {
      this.newLabVisitForm.get('patient')?.setErrors({
        required: true
      });
    }

    if (this.newLabVisitForm.invalid) {
      return;
    }

    const value = this.newLabVisitForm.value;
    if (value.note === '') value.note = 'Beleška';

    const timezoneOffset = new Date().getTimezoneOffset();
    const datetimeString = `${value.date}T${value.time}:00${this.getTimezoneOffsetString(timezoneOffset)}`;

    this.labService.createLabExamination({
      lbp: value.patient.lbp,
      scheduledDate: datetimeString,
      note: value.note
    }).subscribe({
      next: () => {
        this.router.navigate(['/']).then(() => {
          this.toast.success('Uspešno ste zakazali posetu laboratoriji.');
        })
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }
    })
  }

  getTimezoneOffsetString(offset: number): string {
    const sign = offset > 0 ? '-' : '+';
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  getUnprocessedReferrals(): void {
    this.showUnprocessedReferralsTable = true;
    this.labService.getUnprocessedReferrals(this.patient.lbp).subscribe({
      next: (res) => {
        this.unprocessedReferrals = res.referrals;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }
}
