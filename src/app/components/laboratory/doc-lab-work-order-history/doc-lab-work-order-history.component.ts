import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LabService } from '../../../service/lab.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DoctorsResponse } from '../../../dto/response/scheduled-appointment-response';
import { ScheduledAppointmentService } from '../../../service/scheduled-appointment.service';
import { SearchBiochemService } from 'src/app/service/search-biochem.service';

@Component({
  selector: 'app-doc-lab-work-order-history',
  templateUrl: './doc-lab-work-order-history.component.html',
  styleUrls: ['./doc-lab-work-order-history.component.css']
})
export class DocLabWorkOrderHistoryComponent implements OnInit {
  workOrderHistoryForm: FormGroup;

  orders: any;
  currentOrder: any;

  results: any;

  doctors: DoctorsResponse[] = [];

  dateError: boolean = false;

  lbp: string = '';

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private labService: LabService,
              private biochemService: SearchBiochemService,
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
    this.currentOrder = undefined;

    const val = this.workOrderHistoryForm.value;

    if ((val.dateFrom === '' && val.dateTo !== '') || (val.dateFrom !== '' && val.dateTo === '')) {
      this.dateError = true;
      return;
    } else {
      this.dateError = false;
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
    this.biochemService.getOrderResult(this.currentOrder.id).subscribe({
      next: (res) => {
        this.results = (res as any).results;
      },
      error: (e) => {
        this.toast.error(e.error.errorMessage || 'Greška. Server se ne odaziva.');
      }
    })
  }

  getDoctorByLbz(lbz: string): string {
    return this.doctors.find(doctor => doctor.lbz === lbz)?.firstName! + ' ' + this.doctors.find(doctor => doctor.lbz === lbz)?.lastName!
  }

  print() {
    window.print();
  }

}
