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

  doctors: any[] = [];
  doctorProfessions = ['Spec. biohemičar', 'Spec. gastroenterolog', 'Spec. ginekolog', 'Spec. kardiolog', 'Spec. neurolog', 'Spec. nefrolog', 'Spec. psihijatar', 'Spec. pulmolog', 'Spec. urolog', 'Spec. hematolog', 'Spec. hirurg'];
  currentDoctorLbz = '';
  currentDoctorFullName = '';

  @ViewChild('new_appointment_content')
  newAppointmentContent!: TemplateRef<any>;

  @ViewChild('view_appointment_content')
  viewAppointmentContent!: TemplateRef<any>;

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  constructor(private changeDetector: ChangeDetectorRef,
              private offcanvasService: NgbOffcanvas,
              private formBuilder: FormBuilder,
              private patientService: PatientService,
              private employeeService: EmployeesService,
              private schedMedExamService: SchedMedExamService,
              private toaster: HotToastService) {
    this.newAppointmentForm = this.formBuilder.group({
      patient: [''],
      note: ['']
    });
    this.employeeService.searchEmployees({
      firstName: '',
      lastName: '',
      departmentName: '',
      hospitalName: '',
      includeDeleted: false,
      page: 0,
      size: 100
    }).subscribe({
      next: (res) => {
        res.userList.forEach(user => {
          if (this.doctorProfessions.includes(user.profession.notation)) {
            this.doctors.push({
              fullName: user.firstName + ' ' + user.lastName,
              departmentName: user.departmentName,
              lbz: user.lbz
            });
          }
        })
      },
      error: (e) => {
        this.toaster.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  onDoctorInputChange(event: any) {
    this.currentDoctorLbz = event.target.value;
    this.calendarComponent.getApi().removeAllEvents();
    this.calendarEnabled = 'auto';
    this.schedMedExamService.searchScheduledAppointments({lbz: this.currentDoctorLbz}).pipe(
      switchMap(exams => {
        const patientInfo = exams.schedMedExamResponseList.map(exam => {
          return this.patientService.getPatientByLbp(exam.lbp);
        });
        return forkJoin(patientInfo).pipe(mergeMap((joined) => of([exams.schedMedExamResponseList, joined])));
      })
    ).subscribe((finalArray) => {
      finalArray[0].forEach((value, index) => {
        this.calendarComponent.getApi().addEvent({
          id: (value as SchedMedExamResponse).id.toString(),
          examId: (value as SchedMedExamResponse).id,
          title: (finalArray[1][index] as PatientResponse).firstName + ' ' + (finalArray[1][index] as PatientResponse).lastName,
          start: (value as SchedMedExamResponse).appointmentDate,
          note: (value as SchedMedExamResponse).note,
          status: (value as SchedMedExamResponse).examinationStatus.examinationStatus,
          backgroundColor: this.getEventColorBasedOnExaminationStatus((value as SchedMedExamResponse).examinationStatus.examinationStatus)
        });
      });
    });
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
              status: 'Zakazano'
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
