import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { SearchBiochemResponse } from 'src/app/dto/response/search-biochem-response';
import { LabService } from 'src/app/service/lab.service';
import { SearchBiochemService } from 'src/app/service/search-biochem.service';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-search-biochem-acc',
  templateUrl: './search-biochem-acc.component.html',
  styleUrls: ['./search-biochem-acc.component.css']
})
export class SearchBiochemAccComponent implements OnInit {

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  orders: any;
  model: any;
  selectedOrder: any;
  results: any;

  accForm: FormGroup;

  constructor(private toast: HotToastService,
    private biochemService: SearchBiochemService,
    private patientService: PatientService,
    private formBuilder: FormBuilder) {
    this.accForm = this.formBuilder.group({
      patient: [''],
      dateFrom: [''],
      dateTo: [''],
      status: ['']
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
    this.selectedOrder = undefined;

    const value = this.accForm.value;

    let lbp: string;
    if (value.patient === undefined || value.patient.lbp === undefined) {
      lbp = '';
    } else {
      lbp = value.patient.lbp;
    }

    this.biochemService.search(this.page - 1, this.pageSize, value.dateFrom, value.dateTo, lbp, value.status).subscribe({
      next: (res) => {
        this.orders = res.orderList;
        this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  selectOrder(order: any) {
    this.selectedOrder = order;
    this.biochemService.getOrderResult(order.id).subscribe({
      next: (res) => {
        this.results = (res as any).results;
      }
    })
  }
}

