import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-covid-vaccination',
  templateUrl: './schedule-covid-vaccination.component.html',
  styleUrls: ['./schedule-covid-vaccination.component.css']
})
export class ScheduleCovidVaccinationComponent implements OnInit {

  form: FormGroup;
  model: any;
  patient: any;
  selectedDate!: Date;
  availableNurses: string = '/';

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private toast: HotToastService) {

    this.form = this.formBuilder.group({
      patient: [''],
      date: [''],
      time: [''],
      note: ['']
    })

    this.patientService.getScheduledCovidTests('', '', 0, 100)
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
  }

  onSubmit() {
    const value = this.form.value;
    this.patientService.scheduleCovidVaccination(value.patient.lbp, value.date + ' ' + value.time + ':00', value.note).subscribe({
      next: () => {
        this.router.navigate(['/covid/vaccinations']).then(() => {
          this.toast.success('Uspešno ste zakazali COVID vakcinaciju');
        })
      },
      error: (e) => this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.')
    })
  }

  checkAvailability() {
    const value = this.form.value;
    this.patientService.getAvailableCovidTestingTerms(value.date + ' ' + value.time + ':00').subscribe({
      next: (res) => {
        this.availableNurses = (res as any).availableNursesNum;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

}
