import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-scheduled-covid-tests',
  templateUrl: './scheduled-covid-tests.component.html',
  styleUrls: ['./scheduled-covid-tests.component.css']
})
export class ScheduledCovidTestsComponent implements OnInit {
  form: FormGroup;

  tests: any;

  page = 1;
  pageSize = 5;
  collectionSize = 0;

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private modalService: NgbModal,
    private toast: HotToastService) {

    this.form = this.formBuilder.group({
      lbp: [''],
      date: ['']
    })

    this.patientService.getScheduledCovidTests('', '', this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.tests = (res as any).scheduledTestingList
      }
    })
  }

  ngOnInit(): void {
  }

  search() {
    const value = this.form.value;

    this.patientService.getScheduledCovidTests(value.lbp, value.date, this.page - 1, this.pageSize).subscribe({
      next: (res) => {
        this.tests = (res as any).scheduledTestingList
      }
    })
  }

  onCancel(id: number) {
    this.modalService.open(NgbdModalConfirm).result.then(() => {
      this.patientService.cancelScheduledCovidTest(id).subscribe({
        next: (res) => {
          this.toast.success('Uspešno ste otkazali termin');
          this.search();
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
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
			<h4 class="modal-title" id="modal-title">Potvrdite otkazivanje termina</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da otkažete termin?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Odustani</button>
			<button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Otkaži</button>
		</div>
	`,
})
export class NgbdModalConfirm {
	constructor(public modal: NgbActiveModal) {}
}
