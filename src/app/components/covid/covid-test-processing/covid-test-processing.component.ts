import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/service/stats.service';

@Component({
  selector: 'app-covid-test-processing',
  templateUrl: './covid-test-processing.component.html',
  styleUrls: ['./covid-test-processing.component.css']
})
export class CovidTestProcessingComponent implements OnInit {
  testsInProcessing: any = [];

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getTestsInProcessing();
  }

  getTestsInProcessing(): void {
    this.statsService.getTestsInProcessing().subscribe(tests => {
      this.testsInProcessing = tests;
    });
  }

  processTest(id: number, result: boolean): void {
    this.statsService.processTest(id, result).subscribe(() => {
      this.getTestsInProcessing();
    });
  }
}