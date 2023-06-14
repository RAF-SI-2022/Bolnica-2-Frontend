import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridMonthPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable, map, switchMap, mergeMap, forkJoin, of } from 'rxjs';
import { PatientService } from 'src/app/service/patient.service';
import { HotToastService } from '@ngneat/hot-toast';


const DAY_NAMES: string[] = ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'];


@Component({
  selector: 'app-schedule-covid-testing',
  templateUrl: './schedule-covid-testing.component.html',
  styleUrls: ['./schedule-covid-testing.component.css']
})
export class ScheduleCovidTestingComponent implements OnInit {
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
    dayHeaderContent: function (arg) {
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
  currentEvents: EventApi[] = [];
  eventId = 0;
  newTestingForm: FormGroup;
  model: any;

  constructor(private formBuilder: FormBuilder,
    private patientService: PatientService,
    private changeDetector: ChangeDetectorRef,
    private toast: HotToastService) {

    this.newTestingForm = this.formBuilder.group({
      patient: ['']
    })
  }

  ngOnInit(): void {
  }

  getEventColorBasedOnExaminationStatus(status: string): string {
    if (status === 'Otkazano') return '#ff5733';
    if (status === 'U toku') return '#54B435';
    if (status === 'Završeno') return '#245953';
    return '#3788d8';
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
    const date = selectInfo.start;

    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    const formattedString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    this.patientService.getAvailableCovidTestingTerms(formattedString).subscribe({
      next: (res) => {

      },
      error: (e) => {
        this.toast.error(e.error.errorMessage);
      }
    })
  }

  handleEventClick(clickInfo: EventClickArg) {

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  onDelete(id: number) {

  }

}
