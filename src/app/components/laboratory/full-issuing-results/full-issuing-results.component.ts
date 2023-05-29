import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HealthRecordService} from "../../../service/health-record.service";
import {HotToastService} from "@ngneat/hot-toast";
import {DatePipe} from "@angular/common";
import {LabService} from "../../../service/lab.service";
import { ActivatedRoute } from '@angular/router';
import { SearchBiochemService } from 'src/app/service/search-biochem.service';

@Component({
  selector: 'app-full-issuing-results',
  templateUrl: './full-issuing-results.component.html',
  styleUrls: ['./full-issuing-results.component.css']
})
export class FullIssuingResultsComponent implements OnInit {
  results: any;

  constructor(private biochemService: SearchBiochemService,
              private toast: HotToastService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((param) => {
      this.biochemService.getOrderResult(param.orderId).subscribe({
        next: (res) => {
          this.results = (res as any).results;
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      });
    })
  }

  ngOnInit(): void {

  }

  printResults() {
    window.print();
  }

}
