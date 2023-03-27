import {Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PatientService } from 'src/app/service/patient.service';
import { CreateScheduledAppointmentRequest } from 'src/app/dto/request/patient.request';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, OperatorFunction, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [
      timeGridPlugin,
      interactionPlugin,
    ],
    initialView: 'timeGridWeek',
    weekends: true,
    buttonText: {
      today: 'Danas'
    },
    events: [
      {title: 'Meeting', start: new Date()}
    ],
    allDaySlot: false,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];
  eventId = 0;
  newAppointmentForm: FormGroup;
  model: any;
  offcanvasSelectedDate = '';
  selectedPatientFullName = '';

  @ViewChild('new_appointment_content')
  newAppointmentContent!: TemplateRef<any>;

  @ViewChild('view_appointment_content')
  viewAppointmentContent!: TemplateRef<any>;

  constructor(private changeDetector: ChangeDetectorRef,
              private offcanvasService: NgbOffcanvas,
              private formBuilder: FormBuilder,
              private patientService: PatientService,
              private toaster: HotToastService) {
    this.newAppointmentForm = this.formBuilder.group({
      patient: [''],
      note: ['']
    })
  }

  ngOnInit(): void {
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

  formatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  inputFormatResultingPatient(value: any) {
    return value.firstName + ' ' + value.lastName;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.offcanvasSelectedDate = selectInfo.startStr;
    this.offcanvasService.open(this.newAppointmentContent, {position: 'end'}).result.then(
      () => {
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        const value = this.newAppointmentForm.value;
        const appointment: CreateScheduledAppointmentRequest = {
          lbp: value.patient.lbp,
          lbzDoctor: '5a2e71bb-e4ee-43dd-a3ad-28e043f8b435',
          appointmentDate: selectInfo.startStr,
          note: value.note,
          lbzNurse: localStorage.getItem('lbz')!
        }

        this.patientService.scheduleAppointment(appointment).subscribe({
          next: (res) => {
            this.eventId++;
            calendarApi.addEvent({
              id: this.eventId.toString(),
              title: value.patient.firstName + ' ' + value.patient.lastName,
              start: selectInfo.startStr
            });
            this.toaster.success('Uspešno ste zakazali pregled');
          },
          error: (e) => {
            this.toaster.error(e.error.errorMessage);
          }
        });
      },
      () => {
      }
    );
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.offcanvasSelectedDate = clickInfo.event.startStr;
    this.selectedPatientFullName = clickInfo.event.title;
    this.offcanvasService.open(this.viewAppointmentContent, {position: 'end'});
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
