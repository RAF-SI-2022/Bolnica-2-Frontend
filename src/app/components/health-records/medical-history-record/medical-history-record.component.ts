import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {HealthRecordService} from "../../../service/health-record.service";
import {DatePipe} from '@angular/common'
import {AuthService} from "../../../service/auth.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SearchPatientsResponse} from "../../../dto/response/patient.response";
import {MedicalExaminationListResponse, MedicalHistory} from "../../../dto/response/health-record.response";

@Component({
  selector: 'app-medical-history-record',
  templateUrl: './medical-history-record.component.html',
  styleUrls: ['./medical-history-record.component.css']
})
export class MedicalHistoryRecordComponent implements OnInit {

  searchHistoryRecordForm: FormGroup;
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  startDate: string = '';
  objectiveFinding: string = '';
  loopClass: any[] = []
  constructor(private formBuilder: FormBuilder,
              private healthRecordService: HealthRecordService,
              private toast: HotToastService,
              private datepipes: DatePipe) {
    this.searchHistoryRecordForm = this.formBuilder.group({
      startDate: [''],
      endDate: ['']
    })
  }

  ngOnInit(): void {
    this.loopClass = [];
    this.healthRecordService.getMedicalExamination({
      startDate: '',
      endDate: ''
    }, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.examinations[i].date, 'yyyy-MM-dd')!;
          this.startDate = dateMod;
          this.objectiveFinding = res.examinations[i].objectiveFinding;
          let elem = {
            startDate: this.startDate,
            objectiveFinding: this.objectiveFinding,
            id: res.examinations[i].id
          }
          this.loopClass.push(elem);
        }
        this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  search() {
    const val = this.searchHistoryRecordForm.value;
    this.loopClass = [];
    this.healthRecordService.getMedicalExamination({
      startDate: val.startDate,
      endDate: val.endDate
    }, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.examinations[i].date, 'yyyy-MM-dd')!;
          this.startDate = dateMod;
          this.objectiveFinding = res.examinations[i].objectiveFinding;
          let elem = {
            startDate: this.startDate,
            objectiveFinding: this.objectiveFinding,
            id: res.examinations[i].id
          }
          this.loopClass.push(elem);
        }
        this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  medicalId(id: number) {
    localStorage.setItem('medicalHistoryId', String(id));
    console.log('This is patients medical history id: ', localStorage.getItem('medicalHistoryId'));
  }

}
