import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap } from 'rxjs';
import { LabService } from 'src/app/service/lab.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-search-scheduled-lab-visits',
  templateUrl: './search-scheduled-lab-visits.component.html',
  styleUrls: ['./search-scheduled-lab-visits.component.css']
})
export class SearchScheduledLabVisitsComponent implements OnInit {
  searchScheduledLabVisitsForm: FormGroup;
  schedLabVisits: any;

  model: any;
  patient: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private toast: HotToastService,
              private modalService: NgbModal,
              private labService: LabService) {
    this.searchScheduledLabVisitsForm = this.formBuilder.group({
      patient: [''],
      date: ['']
    })
  }

  ngOnInit(): void {
    this.labService.getSchedLabExaminations('', '').subscribe({
      next: (res) => {
        this.schedLabVisits = res;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška server se ne odaziva.');
      }
    })
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(150),
    distinctUntilChanged(),
    switchMap((term) =>
      this.patientService.searchPatients({
        firstName: term,
        lastName: '',
        jmbg: '',
        lbp: ''
      }).pipe(map(response => response.patients))
    )
  );

  formatter = (x: {
    firstName: string,
    lastName: string,
    gender: string,
    birthDate: string
  }) => {
    x.firstName,
    x.lastName,
    x.gender,
    x.birthDate
  };

  inputFormatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  onPatientSelected(event: any) {
    this.patient = event.item;
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

  onSubmit() {
    const value = this.searchScheduledLabVisitsForm.value;
    let lbp: string = '';
    if (value.patient !== undefined) lbp = value.patient.lbp;
    this.labService.getSchedLabExaminations(lbp, value.date).subscribe({
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
				<strong>Da li ste sigurni da želite da otkažete posetu?</strong>
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
