import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { size } from 'cypress/types/lodash';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient-condition-history',
  templateUrl: './patient-condition-history.component.html',
  styleUrls: ['./patient-condition-history.component.css']
})
export class PatientConditionHistoryComponent implements OnInit {

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  conditions:any;
  condHistoryForm: FormGroup;

  constructor(private toast: HotToastService,private formBuilder: FormBuilder,private patientService:PatientService,private router: Router) { 
    this.condHistoryForm = this.formBuilder.group({
    lbp:'c1c8ba08-966a-4cc5-b633-d1ef15d7caaf', 
    dateFrom: [''],
    dateTo: [''],
  })
  this.search();
 }

  ngOnInit(): void {
  }
  search(){
    const value = this.condHistoryForm.value;
    this.patientService.getPatientsCondition(value.lbp,value.dateFrom,value.dateTo,this.page-1,this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        this.conditions = res.patientConditionList;
         this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }
  registerCondition(){
    const value = this.condHistoryForm.value;
    this.router.navigate(['/register-patient-condition', value.lbp]);
  }

}
