import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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

  lbp: string = '';

  constructor(private toast: HotToastService,private formBuilder: FormBuilder,private patientService:PatientService,private router: Router,private route: ActivatedRoute) {
    this.condHistoryForm = this.formBuilder.group({
    dateFrom: [''],
    dateTo: [''],
  })

  this.route.params.subscribe((params) => {
    this.lbp = params.lbp;
    this.search();
  })
 }

  ngOnInit(): void {
  }
  search(){
    const value = this.condHistoryForm.value;
    this.patientService.getPatientsCondition(this.lbp,value.dateFrom,value.dateTo,this.page-1,this.pageSize).subscribe({
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
    this.router.navigate(['/register-patient-condition', this.lbp]);
  }

}
