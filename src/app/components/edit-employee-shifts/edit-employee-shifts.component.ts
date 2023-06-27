import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridMonthPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-edit-employee-shifts',
  templateUrl: './edit-employee-shifts.component.html',
  styleUrls: ['./edit-employee-shifts.component.css']
})
export class EditEmployeeShiftsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [
      dayGridMonthPlugin,
      interactionPlugin,
    ],
    headerToolbar: {
      end: 'prev,next'
    },
    initialView: 'dayGridMonth',
    locale: 'sr-me',
    firstDay: 1,
    weekends: true,
    navLinks: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  @ViewChild('new_shift_content')
  newShiftContent!: TemplateRef<any>;

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  od: any;
  do: any;
  shiftType: string = '';

  constructor(private employeeService: EmployeesService,
              private offcanvasService: NgbOffcanvas) {
    this.employeeService.getShiftsByLbz(localStorage.getItem('lbz')!).subscribe({
      next: (res) => {
        const shifts: any[] = (res as any).shifts;
        shifts.forEach(shift => {
          this.calendarComponent.getApi().addEvent({
            id: shift.id,
            title: shift.shiftType.notation,
            start: shift.startTime,
            allDay: true,
            stick: true
          })
        })
      }
    })
  }

  ngOnInit(): void {
  }

  examViewDate = '';

  startHour: string = '';
  startMinute: string = '';
  endHour: string = '';
  endMinute: string = '';

  handleDateSelect(selectInfo: DateSelectArg) {
    this.examViewDate = selectInfo.startStr;
    this.offcanvasService.open(this.newShiftContent, { position: 'end' }).result.then(() => {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();

      this.employeeService.addShift(localStorage.getItem('lbz')!, this.shiftType, this.examViewDate, this.od, this.do).subscribe({
        next: (res) => {
          location.reload();
        }
      })
    })
  }

  handleEventClick(clickInfo: EventClickArg) {

  }

  handleEvents(events: EventApi[]) {

  }

  onShiftChange(event: any) {
    this.shiftType = event.target.value;
    if (this.shiftType === 'Prva smena') {
      this.od = '07:00';
      this.do = '14:00';
    } else if (this.shiftType === 'Druga smena') {
      this.od = '13:00';
      this.do = '20:00';
    } else if (this.shiftType === 'Treća smena') {
      this.od = '19:00';
      this.do = '02:00';
    } else if (this.shiftType === 'Međusmena') {
      this.od = '';
      this.do = '';
    }
  }

}
