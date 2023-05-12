import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-view-stationary-patient-receptions',
  templateUrl: './view-stationary-patient-receptions.component.html',
  styleUrls: ['./view-stationary-patient-receptions.component.css']
})
export class ViewStationaryPatientReceptionsComponent implements OnInit {
  stationaryReceptionsForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  model: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService) {
    this.stationaryReceptionsForm = this.formBuilder.group({
      patient: ['']
    });
  }

  ngOnInit(): void {
  }

  searchPatients = (text$: Observable<string>) =>
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

  formatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  inputFormatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  search() {

  }

}
