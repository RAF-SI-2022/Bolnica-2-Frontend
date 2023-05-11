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
  stationaryAppointmentsForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  loopClass: any[] = [];
  date: any;
  status: any;
  note: any;

  model: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private datepipes: DatePipe) {
    this.stationaryAppointmentsForm = this.formBuilder.group({
      lbp: [''],
      dateAndTime: ['']
    });
  }

  ngOnInit(): void {
  }

  search() {
    this.loopClass = [];
    const val = this.stationaryAppointmentsForm.value;
    if(val.dateAndTime === '') {
      let thisDate = new Date();
      val.dateAndTime = this.datepipes.transform(thisDate, 'yyyy-MM-dd');
    }
    this.patientService.getAppointments(val.lbp, val.dateAndTime, this.page-1, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.appointments[i].receiptDate, 'yyyy-MM-dd')!;
          this.date = dateMod;
          this.status = res.appointments[i].status.notation;
          this.note = res.appointments[i].note;
          let elem = {
            date: this.date,
            status: this.status,
            note: this.note
          }
          this.loopClass.push(elem);
        }
      }
    });
  }

}
