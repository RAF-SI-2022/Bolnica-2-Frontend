import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {
  lbp: string = '';

  visits: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toast: HotToastService,
              private patientService: PatientService) {

    this.route.params.subscribe((params) => {
      this.lbp = params.lbp;

      this.patientService.getStationaryVisitHistory(this.lbp, this.page - 1, this.pageSize).subscribe({
        next: (res) => {
          this.visits = (res as any).visitResponseList;
          this.collectionSize = (res as any).count;
        }
      })
    })
  }

  ngOnInit(): void {
  }

  search() {
    this.patientService.getStationaryVisitHistory(this.lbp, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.visits = (res as any).visitResponseList;
        this.collectionSize = (res as any).count;
      }
    })
  }

}
