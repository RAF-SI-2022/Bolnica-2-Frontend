import { Component, OnInit } from '@angular/core';
import {HealthRecordService} from "../../../../service/health-record.service";
import {HotToastService} from "@ngneat/hot-toast";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-full-medical-history',
  templateUrl: './full-medical-history.component.html',
  styleUrls: ['./full-medical-history.component.css']
})
export class FullMedicalHistoryComponent implements OnInit {

  selectedHealthRecord: History[] = [];
  page = 1;
  pageSize = 5;
  idM = -1;
  fullRecordForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private healthRecordService: HealthRecordService,
              private toast: HotToastService,
              private datepipes: DatePipe) {
    this.fullRecordForm = this.formBuilder.group({
      advice: [''],
      anamnesis: [''],
      currentIllness: [''],
      date: [''],
      diagnosis: [''],
      familyAnamnesis: [''],
      id: [''],
      lbz: [''],
      mainSymptoms: [''],
      objectiveFinding: [''],
      patientOpinion: [''],
      suggestedTherapy: ['']
    });
  }

  printThisPage() {
    window.print();
  }

  ngOnInit(): void {
    let val = this.fullRecordForm.value;
    let lbp = localStorage.getItem('patientLBP')!;
    this.healthRecordService.getMedicalExamination({
      startDate: '',
      endDate: ''
    }, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        let medicalIdString = localStorage.getItem('medicalHistoryId');
        this.idM = Number(medicalIdString);
        for(let i = 0; i < res.count; i++) {
          if(Number(medicalIdString) == res.examinations[i].id) {
            this.fullRecordForm.get('advice')?.setValue(res.examinations[i].advice);
            this.fullRecordForm.get('anamnesis')?.setValue(res.examinations[i].anamnesis);
            this.fullRecordForm.get('currentIllness')?.setValue(res.examinations[i].currentIllness);
            let date = this.datepipes.transform(res.examinations[i].date, 'yyyy-MM-dd');
            this.fullRecordForm.get('date')?.setValue(date);
            if (res.examinations[i].diagnosis !== null)
              this.fullRecordForm.get('diagnosis')?.setValue(res.examinations[i].diagnosis.description);
            this.fullRecordForm.get('familyAnamnesis')?.setValue(res.examinations[i].familyAnamnesis);
            this.fullRecordForm.get('id')?.setValue(res.examinations[i].id);
            this.fullRecordForm.get('lbz')?.setValue(res.examinations[i].lbz);
            this.fullRecordForm.get('mainSymptoms')?.setValue(res.examinations[i].mainSymptoms);
            this.fullRecordForm.get('objectiveFinding')?.setValue(res.examinations[i].objectiveFinding);
            this.fullRecordForm.get('patientOpinion')?.setValue(res.examinations[i].patientOpinion);
            this.fullRecordForm.get('suggestedTherapy')?.setValue(res.examinations[i].suggestedTherapy);
            break;
          }
        }
        this.fullRecordForm.disable();
        console.log('SelectedHistory: ' + this.selectedHealthRecord);

      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

}
