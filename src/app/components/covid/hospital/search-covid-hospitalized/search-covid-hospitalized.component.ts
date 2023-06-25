import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-covid-hospitalized',
  templateUrl: './search-covid-hospitalized.component.html',
  styleUrls: ['./search-covid-hospitalized.component.css']
})
export class SearchCovidHospitalizedComponent implements OnInit {
  patients: any;
  form: FormGroup;

  patient: any;
  model: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private toast: HotToastService) {
    this.form = this.formBuilder.group({
      patient: [''],
      respirator: [''],
      imunizovan: ['']
    })

    this.patientService.getHospitalisedPatientsByPbb({
      firstName: '',
      lastName: '',
      jmbg: '',
      lbp: '',
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        this.patients = (res as any).list;
        console.log(res);
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
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

  onSubmit() {
    const value = this.form.value;

    this.patientService.getHospitalisedPatientsByPbb({
      firstName: '',
      lastName: '',
      jmbg: '',
      lbp: value.patient.lbp,
      page: this.page - 1,
      size: this.pageSize,
      respirator: value.respirator,
      imunizovan: value.imunizovan
    }).subscribe({
      next: (res) => {
        this.patients = (res as any).list;
        this.collectionSize = (res as any).count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

}
