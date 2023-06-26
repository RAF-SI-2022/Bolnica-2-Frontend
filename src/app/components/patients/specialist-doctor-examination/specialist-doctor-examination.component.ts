import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientResponse } from 'src/app/dto/response/patient.response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HealthRecordService } from 'src/app/service/health-record.service';
import { AuthService } from 'src/app/service/auth.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-specialist-doctor-examination',
  templateUrl: './specialist-doctor-examination.component.html',
  styleUrls: ['./specialist-doctor-examination.component.css']
})
export class SpecialistDoctorExaminationComponent implements OnInit {

  specialistDoctorExaminationForm: FormGroup;
  patient: any;
  alergies: Array<any> = [];
  vaccines: Array<any> = [];
  showButton: boolean;
  expand: boolean;
  isSpecial: boolean;
  closeResult: string;
  modalBody: string;
  modalTitle: string;
  modalButton: string;
  dodajDijagnozuDugme: boolean;
  covid: any;

  constructor(protected router: Router, private toast: HotToastService, private modalService: NgbModal, private patientsService: PatientService, private route: ActivatedRoute, private formBuilder: FormBuilder, private healthRecordService: HealthRecordService, private authService: AuthService) {
    this.specialistDoctorExaminationForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      glavneTegobe: ['',],
      sadasnjaBolest: ['',],
      licnaAnamneza: ['',],
      porodicnaAnamneza: ['',],
      misljenjePacijenta: ['',],
      objektivniNalaz: ['', Validators.required],
      sifraBolesti: ['',],
      rezultatLecenja: ['',],
      opisStanja: ['',],
      postojecaDijagnoza: [false,],
      predlaganjeTerapije: ['',],
      savet: ['',],
      izvestajPoveljiv: [false,]
    });
    this.showButton = true;
    this.expand = false;
    this.isSpecial = false;
    if (authService.hasPermission('ROLE_DR_SPEC_POV')) {
      this.isSpecial = true;
    }
    this.closeResult = '';
    this.modalBody = '';
    this.modalTitle = '';
    this.modalButton = '';
    this.dodajDijagnozuDugme = true;
  }

  onCovidCheckboxChange(event: any) {
    this.covid = event.target.checked;
  }

  ngOnInit(): void {
    const lbp = this.route.snapshot.queryParamMap.get('lbp')?.toString();
    this.patientsService.getPatientByLbp(lbp ? lbp : '')
      .subscribe({
        next: (res) => {
          this.specialistDoctorExaminationForm.get('firstName')?.setValue(res.firstName);
          this.specialistDoctorExaminationForm.get('lastName')?.setValue(res.lastName);
          this.specialistDoctorExaminationForm.get('birthDate')?.setValue(res.birthDate);
          this.patient = res;
        },
        error: (e) => {
        }
      });

    this.healthRecordService.getRecord(lbp ? lbp : '').subscribe({
      next: (res) => {
        for (let i = 0; i < res.allergies.allergies.length; i++) {
          this.alergies.push(res.allergies.allergies[i].allergen.name);
        }

        for (let i = 0; i < res.vaccinations.vaccinations.length; i++) {
          this.vaccines.push(res.vaccinations.vaccinations[i].vaccine.name);
        }
      },
      error: (e) => {
      }
    });

  }

  onButtonClick(): void {
    this.showButton = false;
    this.expand = true;
  }

  addDiagnosis(): void {
    if (this.specialistDoctorExaminationForm.invalid) {
      //TODO napravi popup da je obavezno ono sranje
    }
  }

  open(content: any) {
    if (this.specialistDoctorExaminationForm.invalid) {
      this.modalBody = 'Unesite objektivni nalaz';
      this.modalTitle = 'Greška';
      this.modalButton = 'OK';
    }
    else {
      this.modalBody = 'Potvrdite čuvanje';
      this.modalTitle = 'Sačuvaj';
      this.modalButton = 'Sačuvaj';
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (this.modalTitle == 'Sačuvaj') {
        const lbp = this.route.snapshot.queryParamMap.get('lbp')?.toString();
        const lbz = localStorage.getItem('lbz');
        const values = this.specialistDoctorExaminationForm.value;

        this.healthRecordService.createExaminationReport(lbp ? lbp : '', lbz ? lbz : '', values.izvestajPoveljiv, values.glavneTegobe, values.sadasnjaBolest, values.licnaAnamneza, values.porodicnaAnamneza, values.misljenjePacijenta, values.objektivniNalaz, values.predlaganjeTerapije, values.savet, values.sifraBolesti, values.postojecaDijagnoza, values.rezultatLecenja, values.opisStanja, this.covid).subscribe({
          next: (res) => {
            console.log(res);
            if (this.router.url.includes('covid')) {
              this.router.navigate(['/covid']).then(() => {
                this.toast.success('Uspešno ste sačuvali pregled.');
              })
            } else {
              this.router.navigate(['/search-patients']).then(() => {
                this.toast.success('Uspešno ste sačuvali pregled.');
              });
            }
          },
          error: (e) => {
            this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
          }
        });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onTextChanged(): void {
    if (this.specialistDoctorExaminationForm.value.objektivniNalaz == '') {
      this.dodajDijagnozuDugme = true;
    }
    else {
      this.dodajDijagnozuDugme = false;
    }
  }

}
