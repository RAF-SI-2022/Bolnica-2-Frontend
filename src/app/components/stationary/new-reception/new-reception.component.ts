import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { EmployeesService } from 'src/app/service/employee.service';
import { LabService } from 'src/app/service/lab.service';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-new-reception',
  templateUrl: './new-reception.component.html',
  styleUrls: ['./new-reception.component.css']
})
export class NewReceptionComponent implements OnInit {
  patientForm: FormGroup;
  patientFormSubmitted: boolean = false;

  referrals: any;
  selectedReferral: any;
  hospitalRooms: any;
  selectedRoom: any;
  doctors: any;
  selectedDoctorLbz: string = '';
  note: string = '';

  model: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private laboratoryService: LabService,
              private toaster: HotToastService,
              private employeeService: EmployeesService,
              private router: Router,
              private route: ActivatedRoute) {
    this.patientForm = this.formBuilder.group({
      patient: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      if (param.lbp) {
        this.patientService.getPatientByLbp(param.lbp).subscribe({
          next: (res) => {
            this.model = res;
          }
        })
      }
    })
  }

  searchPatients = (text$: Observable<string>) =>
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

  formatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  inputFormatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  searchStationaryReferrals() {
    this.patientFormSubmitted = true;

    if (this.patientForm.invalid) {
      return;
    }

    const value = this.patientForm.value;

    this.laboratoryService.getUnprocessedReferralsV3(value.patient.lbp, 'Stacionar').subscribe({
      next: (res) => {
        this.referrals = res;
      },
      error: (e) => {
        if (e.error.errorMessage === 'Uput sa zadatim parametrima nije pronadjen') {
          this.referrals = [];
          return;
        }
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  showHospitalRooms(referral: any) {
    this.selectedReferral = referral;
    this.patientService.getHospitalRooms(localStorage.getItem('pbo')!, 0, 100).subscribe({
      next: (res) => {
        this.hospitalRooms = (res as any).rooms;
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  selectRoom(room: any) {
    this.selectedRoom = room;
    this.employeeService.getDoctorsByPbo(localStorage.getItem('pbo')!).subscribe({
      next: (res) => {
        this.doctors = res;
      }
    })
  }

  onDoctorInputChange(event: any) {
    this.selectedDoctorLbz = event.target.value;
  }

  onSubmit() {
    const patientValue = this.patientForm.value;
    const hospitalizeRequest: any = {
      hospitalRoomId: this.selectedRoom.id,
      lbp: patientValue.patient.lbp,
      specialistLbz: this.selectedDoctorLbz,
      diagnosis: 'Dijagnoza',
      note: this.note,
      referralId: this.selectedReferral.referralId
    }

    this.patientService.hospitalize(hospitalizeRequest).subscribe({
      next: (res) => {
        this.router.navigate(['/stationary-patient-reception']).then(() => {
          this.toaster.success('Uspešan prijem pacijenta');
        })
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

}
