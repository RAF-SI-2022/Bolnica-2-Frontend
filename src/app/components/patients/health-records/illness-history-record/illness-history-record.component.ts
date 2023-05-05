import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HealthRecordService} from "../../../../service/health-record.service";
import {HotToastService} from "@ngneat/hot-toast";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-illness-history-record',
  templateUrl: './illness-history-record.component.html',
  styleUrls: ['./illness-history-record.component.css']
})
export class IllnessHistoryRecordComponent implements OnInit {

  searchHistoryRecordForm: FormGroup;
  page = 1;
  pageSize = 5;
  collectionSize = 0;
  startDate: string = '';
  endDateIllness: string = '';
  id: number = -1;
  loopClass: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private healthRecordService: HealthRecordService,
              private toast: HotToastService,
              private datepipes: DatePipe) {
    this.searchHistoryRecordForm = this.formBuilder.group({
      MKB10: [''],
    })
  }

  ngOnInit(): void {
    this.loopClass = [];
    this.healthRecordService.getMedicalHistory({
      mkb10: '',
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.history[i].illnessStart, 'yyyy-MM-dd')!;
          this.startDate = dateMod;
          let dateModEnd = this.datepipes.transform(res.history[i].illnessEnd, 'yyyy-MM-dd')!;
          if (res.history[i].illnessEnd === null) {
            this.endDateIllness = '/';
          } else {
            this.endDateIllness = dateModEnd;
          }
          this.id = res.history[i].id;
          let elem = {
            diagnosis: res.history[i].diagnosis.description,
            startDate: this.startDate,
            endDate: this.endDateIllness,
            treatmentResult: res.history[i].treatmentResult.notation,
            currentStateDescription: res.history[i].currentStateDescription
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
    this.healthRecordService.getMedicalHistory({
      mkb10: val.MKB10,
      page: this.page - 1,
      size: this.pageSize
    }).subscribe({
      next: (res) => {
        console.log(res);
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.history[i].illnessStart, 'yyyy-MM-dd')!;
          this.startDate = dateMod;
          let dateModEnd = this.datepipes.transform(res.history[i].illnessEnd, 'yyyy-MM-dd')!;
          this.endDateIllness = dateModEnd;
          this.id = res.history[i].id;
          let elem = {
            diagnosis: res.history[i].diagnosis.description,
            startDate: this.startDate,
            endDate: this.endDateIllness,
            treatmentResult: res.history[i].treatmentResult.notation,
            currentStateDescription: res.history[i].currentStateDescription
          }
          this.loopClass.push(elem);
        }
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  medicalId() {
    localStorage.setItem('medicalHistoryId', String(this.id));
    console.log('This is patients medical history id: ', localStorage.getItem('medicalHistoryId'));
  }
}
