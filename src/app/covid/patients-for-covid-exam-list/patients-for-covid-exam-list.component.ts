import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap } from 'rxjs';
import { LabService } from 'src/app/service/lab.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patients-for-covid-exam-list',
  templateUrl: './patients-for-covid-exam-list.component.html',
  styleUrls: ['./patients-for-covid-exam-list.component.css']
})
export class PatientsForCovidExamListComponent implements OnInit {

  covidExamList: FormGroup;
  schedLabVisits: any;
  lbp:string;
  date:string;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private toast: HotToastService,
              private modalService: NgbModal,
              private labService: LabService) {
    this.covidExamList = this.formBuilder.group({
      lbp: [''],
      date: ['']
    })
    this.lbp='';
    this.date='';
  }

  ngOnInit(): void {
    //TODO
    /*
    this.labService.getPatientCovidExamList('', '').subscribe({
      next: (res) => {
        this.schedLabVisits = res;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }
    })*/
  }

  search():void {/*
    this.labService.getPatientCovidExamList('', '').subscribe({
      next: (res) => {
        this.schedLabVisits = res;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }*/
  }
  refreshVisits() {
    this.labService.getSchedLabExaminations('', '').subscribe({
      next: (res) => {
        this.schedLabVisits = res;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }
    })
  }

  onCancel(id: number) {
    this.modalService.open(NgbdModalConfirm).result.then(data => {
      this.labService.updateLabExamStatus(id, 'Otkazano').subscribe({
        next: (res) => {
          this.toast.success('Uspešno ste otkazali laboratorijsku posetu');
          this.refreshVisits();
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
			<h4 class="modal-title" id="modal-title">Potvrdite otkazivanje posete</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da otkažete zakazan pregled?</strong>
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
