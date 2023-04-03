import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {HealthRecordService} from "../../../service/health-record.service";
import {DatePipe} from '@angular/common'
import {AuthService} from "../../../service/auth.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UpdateHealthRecordRequest} from "../../../dto/request/health-record.request";

@Component({
  selector: 'app-basic-health-record',
  templateUrl: './basic-health-record.component.html',
  styleUrls: ['./basic-health-record.component.css']
})
export class BasicHealthRecordComponent implements OnInit {


  bloodtypeForm: FormGroup;
  allergiesForm: FormGroup;
  vaccinationForm: FormGroup;

  bloodTypeSubmitted = false;
  allergiesSubmitted = false;
  vaccinesSubmitted = false;

  allergies: any[] = [];
  vaccines: any[] = [];

  isInEditMode:boolean;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private healthRecordService: HealthRecordService,
              private toast: HotToastService,
              private datepipes: DatePipe,
              private authService: AuthService,
              private modalService: NgbModal) {
    this.isInEditMode = false;
    this.bloodtypeForm = this.formBuilder.group({
      id: ['', Validators.required],
      lbp: ['', Validators.required],
      datumRegistracijeKartona: ['', Validators.required],
      krvnaGrupa: ['', Validators.required],
      rhFaktor: ['', Validators.required]
    });

    this.bloodtypeForm.disable();

    this.allergiesForm = this.formBuilder.group({
      listaAlergija: [''],
      alergije: ['', Validators.required]
    });
    this.allergiesForm.get('listaAlergija')?.disable();

    this.vaccinationForm = this.formBuilder.group({
      listaPrimljenihVakcina: [''],
      vakcine: ['', Validators.required],
      datumPrijemaVakcine: ['', Validators.required]
    });
    this.vaccinationForm.get('listaPrimljenihVakcina')?.disable();
  }

  ngOnInit(): void {
    this.healthRecordService.getRecord(localStorage.getItem('patientLBP')!).subscribe({
      next:(res) => {
        this.bloodtypeForm.get('id')?.setValue(res.id);
        this.bloodtypeForm.get('lbp')?.setValue(res.patientLbp);
        let latest_date = this.datepipes.transform(res.registrationDate, 'yyyy-MM-dd');
        this.bloodtypeForm.get('datumRegistracijeKartona')?.setValue(latest_date);
        this.bloodtypeForm.get('krvnaGrupa')?.setValue(res.bloodType);
        const rh = Object.values(res.rhFactor);
        this.bloodtypeForm.get('rhFaktor')?.setValue(rh);
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })


    this.healthRecordService.getRecord(localStorage.getItem('patientLBP')!).subscribe({
      next:(res) => {
        console.log(res);
        console.log(res.allergies.allergies.length);
        let listOfAllergies: string = '';
        for(let i = 0; i < res.allergies.allergies.length; i++) {
          listOfAllergies = listOfAllergies.concat(res.allergies.allergies[i].allergen.name);
          if(!(i == res.allergies.allergies.length-1)) {
            listOfAllergies = listOfAllergies.concat(', ');
          }
        }
        this.allergiesForm.get('listaAlergija')?.setValue(listOfAllergies);
        this.allergies = res.allergies.allergies.map(allergy => allergy.allergen.name);
        this.allergiesForm.get('alergije')?.setValue(res.allergies);
      }
    })

    this.healthRecordService.getRecord(localStorage.getItem('patientLBP')!).subscribe({
      next:(res) => {
        console.log(res);
        console.log(res.vaccinations.count);
        let vaccineList = '';
        for(let i = 0; i < res.vaccinations.count; i++) {
          vaccineList = vaccineList.concat(res.vaccinations.vaccinations[i].vaccine.name);
          if(!(i == res.vaccinations.count - 1)) {
            vaccineList = vaccineList.concat(', ');
          }
        }
        this.vaccinationForm.get('listaPrimljenihVakcina')?.setValue(vaccineList);
        this.vaccines = res.vaccinations.vaccinations.map(vaccine => vaccine.vaccine.name);
      }
    })

  }

  edit(): void {
    this.bloodtypeForm.get('krvnaGrupa')?.enable();
    this.bloodtypeForm.get('rhFaktor')?.enable();
    this.isInEditMode = true;
  }

  save(): void {
    this.bloodTypeSubmitted = true;

    if(this.bloodtypeForm.invalid) {
      return;
    }

    const bloodTypeValues = this.bloodtypeForm.value;

    this.modalService.open(NgbdModalConfirm).result.then((data) => {
      this.healthRecordService.updateHealthRecord({
        blodtype: bloodTypeValues.krvnaGrupa,
        rhfactor: bloodTypeValues.rhFaktor
      }).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['']).then(() => {
            this.toast.success('Uspešno ste izmenili podatke');
          })
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage);
        }
      })
    }, (dismiss) => {
    });
  }

  saveAllergies() {
    this.allergiesSubmitted = true;

    if(this.allergiesForm.invalid) {
      return;
    }

    this.modalService.open(NgbdModalConfirmAllergy).result.then((data) => {
      const allergyTypeValues = this.allergiesForm.value;
      this.healthRecordService.addAllergy({
        allergen: allergyTypeValues.alergije
      }).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['']).then(() => {
            this.toast.success('Uspešno ste dodali novu alergiju');
          })
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage);
        }
      })
    }, (dismiss) => {
    });
  }

  saveVaccine() {
    this.vaccinesSubmitted = true;

    if(this.vaccinationForm.invalid) {
      console.log('Ovde sam usao')
      return;
    }

    this.modalService.open(NgbdModalConfirmVaccine).result.then((data) => {
      const val = this.vaccinationForm.value;

      this.healthRecordService.addVaccine({
        vaccine: val.vakcine,
        date: val.datumPrijemaVakcine
      }).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['']).then(() => {
            this.toast.success('Uspešno ste dodali novu vakcinu');
          })
        },
        error: (e) => {
          this.toast.error(e.error.errorMessage);
        }
      })
    }, (dismiss) => {
    });
  }
}

@Component({

  selector: 'ngbd-modal-confirm',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Cuvanje Kartona</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da sacuvate izmene?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Sacuvaj</button>
		</div>
	`,
})

export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({

  selector: 'ngbd-modal-confirm-allergy',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Dodavanje alergije</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da dodate novu alergiju?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Dodaj</button>
		</div>
	`,
})

export class NgbdModalConfirmAllergy {
  constructor(public modal: NgbActiveModal) {}
}



@Component({

  selector: 'ngbd-modal-confirm-vaccine',
  standalone: true,
  template: `
		<div class="modal-header">
			<h4 class="modal-title" id="modal-title">Dodavanje nove vakcine</h4>
			<button
				type="button"
				class="btn-close"
				aria-describedby="modal-title"
				(click)="modal.dismiss('Cross click')"
			></button>
		</div>
		<div class="modal-body">
			<p>
				<strong>Da li ste sigurni da želite da dodate novu vakcinu?</strong>
			</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Otkaži</button>
			<button type="button" class="btn btn-success" (click)="modal.close('Ok click')">Dodaj</button>
		</div>
	`,
})

export class NgbdModalConfirmVaccine {
  constructor(public modal: NgbActiveModal) {}
}
