import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotToastService} from "@ngneat/hot-toast";
import {DatePipe} from "@angular/common";
import {LabService} from "../../../service/lab.service";
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-issuing-results',
  templateUrl: './issuing-results.component.html',
  styleUrls: ['./issuing-results.component.css']
})
export class IssuingResultsComponent implements OnInit {

  searchIssueResults: FormGroup;
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  startDate: string = '';
  objectiveFinding: string = '';

  orders: any;

  dateError: boolean = false;
  lbpError: boolean = false;

  model: any;

  constructor(private formBuilder: FormBuilder,
              private labService: LabService,
              private toast: HotToastService,
              private patientService: PatientService,
              private datepipes: DatePipe) {
    this.searchIssueResults = this.formBuilder.group({
      lbp: [''],
      startDate: [''],
      endDate: ['']
    })
  }

  ngOnInit(): void {
    this.search();
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
    const val = this.searchIssueResults.value;
    this.labService.getIssuedResultsLab(val.lbp.lbp, val.startDate, val.endDate, this.page - 1, this.pageSize
    ).subscribe({
      next: (res) => {
        this.orders = res.orderList;
        this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

}
