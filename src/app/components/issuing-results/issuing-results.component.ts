import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotToastService} from "@ngneat/hot-toast";
import {DatePipe} from "@angular/common";
import {LabService} from "../../service/lab.service";

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
  loopClass: any[] = [];
  dateError: boolean = false;
  lbpError: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private labService: LabService,
              private toast: HotToastService,
              private datepipes: DatePipe) {
    this.searchIssueResults = this.formBuilder.group({
      lbp: ['', Validators.required],
      startDate: [''],
      endDate: ['']
    })
  }

  ngOnInit(): void {}

  search() {
    this.lbpError = false;
    if(this.searchIssueResults.get('lbp')?.value === '') {
      this.lbpError = true;
      return;
    }
    this.dateError = false;
    if ((this.searchIssueResults.get('startDate')?.value === '' && this.searchIssueResults.get('endDate')?.value !== '') || (this.searchIssueResults.get('startDate')?.value !== '' && this.searchIssueResults.get('endDate')?.value === '')) {
      this.dateError = true;
      return;
    }
    const val = this.searchIssueResults.value;
    this.loopClass = [];
    this.labService.getIssuedResults(val.lbp, val.startDate, val.endDate, this.page - 1, this.pageSize
    ).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('issueLbp', this.searchIssueResults.get('lbp')?.value);
        console.log('isseLbp:', this.searchIssueResults.get('lbp')?.value)
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.orderList[i].creationTime, 'yyyy-MM-dd')!;
          let elem = {
            id: res.orderList[i].id,
            referralId: res.orderList[i].referralId,
            creationTime: dateMod,
            status: res.orderList[i].status.notation
          }
          this.loopClass.push(elem);
        }
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

  issuingResultId(id: number) {
    localStorage.setItem('issuingResultId', String(id));
    console.log('This is issuing result id: ', localStorage.getItem('issuingResultId'));
  }

}
