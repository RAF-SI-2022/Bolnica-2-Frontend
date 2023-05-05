import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LabService } from '../../../service/lab.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DoctorsResponse } from '../../../dto/response/scheduled-appointment-response';
import { ScheduledAppointmentService } from '../../../service/scheduled-appointment.service';

@Component({
  selector: 'app-doc-lab-work-order-history',
  templateUrl: './doc-lab-work-order-history.component.html',
  styleUrls: ['./doc-lab-work-order-history.component.css']
})
export class DocLabWorkOrderHistoryComponent implements OnInit {
  workOrderHistoryForm: FormGroup;

  orders: any;
  currentOrder: any;

  doctors: DoctorsResponse[] = [];

  dateError: boolean = false;

  lbp: string = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private labService: LabService,
              private schedMedService: ScheduledAppointmentService,
              private toast: HotToastService) {
    this.workOrderHistoryForm = this.formBuilder.group({
      dateFrom: [''],
      dateTo: ['']
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.lbp = param.lbp;
    })

    this.schedMedService.getDoctors().subscribe({
      next: (res) => {
        this.doctors = res as any;
      }
    });

    this.labService.getWorkOrderHistoryDoc(this.lbp, '', '').subscribe({
      next: (res) => {
        this.orders = (res as any).orderList;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  onSubmit() {
    const val = this.workOrderHistoryForm.value;
    console.log(val);
    console.log(this.lbp);

    if ((val.dateFrom === '' && val.dateTo !== '') || (val.dateFrom !== '' && val.dateTo === '')) {
      this.dateError = true;
      return;
    }

    this.labService.getWorkOrderHistoryDoc(this.lbp, val.dateFrom, val.dateTo).subscribe({
      next: (res) => {
        this.orders = (res as any).orderList;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  selectOrder(order: any) {
    if (order.status.notation !== 'Obrađen') {
      this.toast.info('Radni nalog nije obrađen');
      return;
    }
    this.currentOrder = order;
    console.log(this.currentOrder);
  }

  getDoctorByLbz(lbz: string): string {
    return this.doctors.find(doctor => doctor.lbz === lbz)?.firstName! + ' ' + this.doctors.find(doctor => doctor.lbz === lbz)?.lastName!
  }

  print() {
    window.print();
  }

}
