import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-search-stationary-patients',
  templateUrl: './search-stationary-patients.component.html',
  styleUrls: ['./search-stationary-patients.component.css']
})
export class SearchStationaryPatientsComponent implements OnInit {

  form: FormGroup;

  page = 1;

  pageSize = 5;
  collectionSize = 0;

  model: any;

  patients: any;

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
  ) {
    this.form = this.formBuilder.group({
      patient: [''],
    });
  }

  ngOnInit(): void {
  }


  searchPatients = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap((term) =>
        this.patientService.getHospitalisedPatients({
          firstName: term,
          lastName: '',
          jmbg: '',
          lbp: '',
          pbo: localStorage.getItem('pbo')
        }).pipe(map(response => response.hospitalisedPatients))
      )
    );

  formatResultingPatient(value: any) {
    return value.patientFirstName + ' ' + value.patientLastName;
  }

  inputFormatResultingPatient(value: any) {
    return value.patientFirstName + ' ' + value.patientLastName;
  }

  search() {

  }
}
