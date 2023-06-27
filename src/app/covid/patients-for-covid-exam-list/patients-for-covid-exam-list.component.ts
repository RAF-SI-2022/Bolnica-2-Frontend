import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patients-for-covid-exam-list',
  templateUrl: './patients-for-covid-exam-list.component.html',
  styleUrls: ['./patients-for-covid-exam-list.component.css']
})
export class PatientsForCovidExamListComponent implements OnInit {


  covidExamList: FormGroup;
  schedLabVisits:any [] = [];
  lbp:string;
  date:string;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private toast: HotToastService,
              private modalService: NgbModal,
              ) {
    this.covidExamList = this.formBuilder.group({
      lbp: [''],
      date: ['']
    })
    this.lbp='';
    this.date='';
  }

  ngOnInit(): void {
    this.search();
  }

  calculateAge(birthDate: string): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    return age;
  }

  search():void {
    this.patientService.getPatientCovidExamList(this.lbp, this.date,this.page,this.pageSize).subscribe({
      next: (res) => {
        this.schedLabVisits = res.schedMedExamResponseList;
        this.collectionSize = res.count;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }
    });

  }

  onCancel(id: string) {
    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.patientService.cancelExam(id).subscribe({
        next: (res) => {
          this.toast.success('Pregled je otkazan');
          this.search();
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage);
        }
      });
    }, (dismiss) => {
    });
  }

  isMyPatient(lbz: string) {
    return localStorage.getItem('lbz') === lbz;
  }


}
@Component({
	selector: 'ngbd-modal-confirm',
	standalone: true,
	template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Potvrdite otkazivanje pregleda</h4>
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
