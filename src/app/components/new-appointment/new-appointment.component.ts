import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridMonthPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { CreateSchedMedExamRequest } from 'src/app/dto/request/sched-med-exam.request';
import { PatientService } from 'src/app/service/patient.service';
import { SchedMedExamService } from 'src/app/service/sched-med-exam.service';
import { EmployeesService } from 'src/app/service/employee.service';
import { SchedMedExamResponse } from 'src/app/dto/response/sched-med-exam.response';
import { PatientResponse } from 'src/app/dto/response/patient.response';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ScheduledAppointmentService } from 'src/app/service/scheduled-appointment.service';
import { DoctorsResponse } from 'src/app/dto/response/scheduled-appointment-response';
import { AuthService } from 'src/app/service/auth.service';

const DAY_NAMES: string[] = ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'];
@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [
      timeGridPlugin,
      dayGridMonthPlugin,
      interactionPlugin,
    ],
    headerToolbar: {
      end: 'today prev,next timeGridWeek,dayGridMonth'
    },
    initialView: 'timeGridWeek',
    locale: 'sr-me',
    dayHeaderContent: function(arg)  {
      return DAY_NAMES[arg.date.getDay()];
    },
    firstDay: 1,
    weekends: true,
    buttonText: {
      today: 'Danas',
      month: 'mesec',
      week: 'nedelja'
    },
    navLinks: true,
    allDaySlot: false,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  calendarEnabled = 'none';
  currentEvents: EventApi[] = [];
  eventId = 0;
  newAppointmentForm: FormGroup;
  model: any;

  examViewDate = '';
  examViewPatientFullName = '';
  examViewNote = '';
  examViewStatus = '';
  examViewStatusColor = '';
  examViewId = -1;

  doctors: Array<DoctorsResponse> = []
  currentDoctorLbz = '';
  currentDoctorFullName = '';
  departments: any;

  @ViewChild('new_appointment_content')
  newAppointmentContent!: TemplateRef<any>;

  @ViewChild('view_appointment_content')
  viewAppointmentContent!: TemplateRef<any>;

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  constructor(protected authService: AuthService,
              private changeDetector: ChangeDetectorRef,
              private offcanvasService: NgbOffcanvas,
              private formBuilder: FormBuilder,
              private patientService: PatientService,
              private employeeService: EmployeesService,
              private schedMedExamService: SchedMedExamService,
              private scheduledAppointmentService: ScheduledAppointmentService,
              private toaster: HotToastService) {
    this.newAppointmentForm = this.formBuilder.group({
      patient: [''],
      note: ['']
    });
    if (!this.authService.hasPermission('ROLE_RECEPCIONER')) {
      this.scheduledAppointmentService.getDoctors().subscribe({
        next: (res) => {
          this.doctors = Object.values(res);
        },
        error: (e) => {
          this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
        }
      })
    } else {
      this.employeeService.getDepartmentsByPbb(localStorage.getItem('pbb')!).subscribe({
        next: (res) => {
          this.departments = res;
          console.log(this.departments);
        }
      })
    }
  }

  onDoctorInputChange(event: any) {
    this.currentDoctorLbz = event.target.value;
    this.calendarComponent.getApi().removeAllEvents();
    this.calendarEnabled = 'auto';
    this.schedMedExamService.searchScheduledAppointments({lbz: this.currentDoctorLbz}).subscribe({
      next: (res) => {
        res.schedMedExamResponseList.forEach(exam => {
          this.calendarComponent.getApi().addEvent({
            id: exam.id.toString(),
            examId: exam.id,
            title: exam.patientResponse.firstName + ' ' + exam.patientResponse.lastName,
            start: exam.appointmentDate,
            note: exam.note,
            status: exam.examinationStatus.examinationStatus,
            backgroundColor: this.getEventColorBasedOnExaminationStatus(exam.examinationStatus.examinationStatus)
          });
        });
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  onOdeljenjeInputChange(event: any) {
    this.employeeService.getDoctorsByPbo(event.target.value).subscribe({
      next: (res) => {
        this.doctors = Object.values(res);
      }
    })
  }

  getEventColorBasedOnExaminationStatus(status: string): string {
    if (status === 'Otkazano') return '#ff5733';
    if (status === 'U toku') return '#54B435';
    if (status === 'Završeno') return '#245953';
    return '#3788d8';
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
          lbp: '',
          page: 0,
          size: 1000
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
    this.examViewDate = selectInfo.startStr;
    this.offcanvasService.open(this.newAppointmentContent, {position: 'end'}).result.then(
      () => {
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();

        const value = this.newAppointmentForm.value;
        if (value.patient === undefined) return;
        const appointment: CreateSchedMedExamRequest = {
          lbp: value.patient.lbp,
          lbzDoctor: this.currentDoctorLbz,
          appointmentDate: selectInfo.startStr,
          note: value.note,
          lbzNurse: localStorage.getItem('lbz')!
        }

        this.schedMedExamService.scheduleAppointment(appointment).subscribe({
          next: (res) => {
            this.calendarComponent.getApi().addEvent({
              id: res.id.toString(),
              examId: res.id,
              title: value.patient.firstName + ' ' + value.patient.lastName,
              start: selectInfo.startStr,
              note: res.note,
              status: 'Zakazano',
              backgroundColor: this.getEventColorBasedOnExaminationStatus('Zakazano')
            });
            this.toaster.success('Uspešno ste zakazali pregled');
          },
          error: (e) => {
            this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
          }
        });
      }
    );
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.examViewDate = clickInfo.event.startStr;
    this.examViewPatientFullName = clickInfo.event.title;
    this.examViewNote = clickInfo.event.extendedProps.note;
    this.examViewId = clickInfo.event.extendedProps.examId;
    this.examViewStatus = clickInfo.event.extendedProps.status;
    this.examViewStatusColor = clickInfo.event.backgroundColor;
    this.offcanvasService.open(this.viewAppointmentContent, {position: 'end'});
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  onDelete(examId: number): void {
    this.schedMedExamService.deleteScheduledAppointment(examId).subscribe({
      next: () => {
        this.toaster.success('Uspešno ste obrisali zakazani pregled');
        this.offcanvasService.dismiss('Cross click');
        this.calendarComponent.getApi().getEventById(examId.toString())?.remove();
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }
}
