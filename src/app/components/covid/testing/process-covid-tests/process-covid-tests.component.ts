import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-process-covid-tests',
  templateUrl: './process-covid-tests.component.html',
  styleUrls: ['./process-covid-tests.component.css']
})
export class ProcessCovidTestsComponent implements OnInit {
  tests: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private patientService: PatientService,
              private toast: HotToastService,
              private modalService: NgbModal) {

    this.patientService.getInProcessCovidTests(this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.tests = (res as any).testings;
        this.collectionSize = (res as any).count;
      }
    })
  }

  ngOnInit(): void {
  }

  search() {
    this.patientService.getInProcessCovidTests(this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.tests = (res as any).testings;
        this.collectionSize = (res as any).count;
      }
    })
  }

  onPositive(testId: number) {
    this.modalService.open(NgbdModalConfirm).result.then(() => {
      this.patientService.updateCovidTestResult(testId, 'Pozitivan').subscribe({
        next: (res) => {
          this.toast.success('Uspešno sačuvan rezultat testa.');
          this.search();
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
          this.search();
        }
      })
    })
  }

  onNegative(testId: number) {
    this.modalService.open(NgbdModalConfirm).result.then(() => {
      this.patientService.updateCovidTestResult(testId, 'Negativan').subscribe({
        next: (res) => {
          this.toast.success('Uspešno sačuvan rezultat testa.');
          this.search();
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
          this.search();
        }
      })
    })
  }

}

@Component({

	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Potvrda rezultata testa</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da sačuvate rezultat testa?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-primary" (click)="modal.close('Ok click')" data-testid="confirm-delete">Sačuvaj</button>
		</div>
	`,
})

export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
