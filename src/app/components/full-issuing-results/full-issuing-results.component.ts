import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HealthRecordService} from "../../service/health-record.service";
import {HotToastService} from "@ngneat/hot-toast";
import {DatePipe} from "@angular/common";
import {LabService} from "../../service/lab.service";

@Component({
  selector: 'app-full-issuing-results',
  templateUrl: './full-issuing-results.component.html',
  styleUrls: ['./full-issuing-results.component.css']
})
export class FullIssuingResultsComponent implements OnInit {

  selectedHealthRecord: History[] = [];
  page = 1;
  pageSize = 5;
  idM = -1;
  fullIssuingResult: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private labService: LabService,
              private toast: HotToastService,
              private datepipes: DatePipe) {
    this.fullIssuingResult = this.formBuilder.group({
      idLab: [''],
      skracenicaLabAnalize: [''],
      idParametra: [''],
      nazivParametra: [''],
      rezultat: [''],
      jedinicaMere: [''],
      donjaGranica: [''],
      gornjaGranica: [''],
      datumIVreme: [''],
      imeIPrezimeZaposlenogKojiJeUpisao: ['']
    });
  }

  ngOnInit(): void {
    let val = this.fullIssuingResult.value;
    let resLbp = localStorage.getItem("issueLbp")!;
    this.labService.getIssuedResults(resLbp, '', '', this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        let issueResultId = localStorage.getItem('issuingResultId');
        this.idM = Number(issueResultId);
        for(let i = 0; i < res.count; i++) {
          if(Number(issueResultId) == res.orderList[i].id) {
            this.fullIssuingResult.get('idLab')?.setValue(res.orderList[i].id);
            this.fullIssuingResult.get('skracenicaLabAnalize')?.setValue(res.orderList[i].analysisParameterResults[0].analysis.abbreviation);
            this.fullIssuingResult.get('idParametra')?.setValue(res.orderList[i].analysisParameterResults[0].parameter.id);
            let date = this.datepipes.transform(res.orderList[i].creationTime, 'yyyy/MM/dd hh:mm:ss');
            this.fullIssuingResult.get('datumIVreme')?.setValue(date);
            this.fullIssuingResult.get('nazivParametra')?.setValue(res.orderList[i].analysisParameterResults[0].parameter.name);
            this.fullIssuingResult.get('rezultat')?.setValue(res.orderList[i].analysisParameterResults[0].result);
            this.fullIssuingResult.get('jedinicaMere')?.setValue(res.orderList[i].analysisParameterResults[0].parameter.measureUnit);
            this.fullIssuingResult.get('donjaGranica')?.setValue(res.orderList[i].analysisParameterResults[0].parameter.lowerBound);
            this.fullIssuingResult.get('gornjaGranica')?.setValue(res.orderList[i].analysisParameterResults[0].parameter.upperBound);
            // this.fullIssuingResult.get('imeIPrezimeZaposlenogKojiJeUpisao')?.setValue(res.examinations[i].patientOpinion);
            break;
          }
        }
        this.fullIssuingResult.disable();
        console.log('SelectedHistory: ' + this.selectedHealthRecord);

      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    });
  }

}
