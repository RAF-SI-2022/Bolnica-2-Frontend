import {Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  offcanvasSelectedDate = '';

  @ViewChild('content')
  content!: TemplateRef<any>;

  constructor(private changeDetector: ChangeDetectorRef,
              private offcanvasService: NgbOffcanvas,
              private formBuilder: FormBuilder) {
    this.newAppointmentForm = this.formBuilder.group({
      patient: ['']
    })
  }

  ngOnInit(): void {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    this.offcanvasSelectedDate = selectInfo.startStr;
    this.offcanvasService.open(this.content, {position: 'end'}).result.then(
      () => {
        const calendarApi = selectInfo.view.calendar;

        console.log(selectInfo);

        calendarApi.unselect(); // clear date selection

        this.eventId++;
        calendarApi.addEvent({
          id: this.eventId.toString(),
          title: this.newAppointmentForm.get('patient')?.value,
          start: selectInfo.startStr
        });
      },
      () => {
      }
    );
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
