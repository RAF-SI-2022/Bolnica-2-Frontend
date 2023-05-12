import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PatientService} from "../../../../service/patient.service";
import {DatePipe} from "@angular/common";
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {

  stationaryAppointmentsForm: FormGroup;

  page = 1;
  pageSize = 5;
  collectionSize = 0;
  loopClass: any[] = [];
  date: any;
  status: any;
  note: any;
  firstName: any;
  lastName: any;
  address: any;
  dateOfBirth: any;
  notation: any;
  appointmentId: any;

  model: any;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientService,
              private datepipes: DatePipe,
              protected authService: AuthService) {
    this.stationaryAppointmentsForm = this.formBuilder.group({
      lbp: [''],
      dateAndTime: ['']
    });
  }

  ngOnInit(): void {
  }

  search() {
    this.loopClass = [];
    const val = this.stationaryAppointmentsForm.value;
    if(val.dateAndTime === '') {
      let thisDate = new Date();
      val.dateAndTime = this.datepipes.transform(thisDate, 'yyyy-MM-dd');
    }
    this.patientService.getAppointments(val.lbp, val.dateAndTime, this.page-1, this.pageSize).subscribe({
      next: (res) => {
        console.log(res);
        for(let i = 0; i < res.count; i++) {
          let dateMod = this.datepipes.transform(res.appointments[i].receiptDate, 'yyyy-MM-dd')!;
          this.date = dateMod;
          this.firstName = res.appointments[i].patient.firstName;
          this.lastName = res.appointments[i].patient.lastName;
          this.address = res.appointments[i].patient.address;
          let dateOfB = this.datepipes.transform(res.appointments[i].patient.birthDate, 'yyyy-MM-dd')!;
          this.dateOfBirth = dateOfB;
          this.note = res.appointments[i].note;
          this.notation = res.appointments[i].status.notation;
          this.appointmentId = res.appointments[i].id;
          if(this.notation !== 'Zakazan') {
            this.notation = '';
          }
          let elem = {
            appointmentId: this.appointmentId,
            date: this.date,
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            dateOfBirth: this.dateOfBirth,
            note: this.note,
            notation: this.notation
          }
          this.loopClass.push(elem);
        }
      }
    });
  }

  cancelAppointment(appointmentId: any, notation: string) {
    this.patientService.cancelAppointment(appointmentId, notation).subscribe({
      next: (res) => {
        console.log(res);
      }
    })
  }

}
