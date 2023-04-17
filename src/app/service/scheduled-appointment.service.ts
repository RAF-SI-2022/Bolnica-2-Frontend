import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SCHED_MED_EXAM_ENDPOINT,SCHED_LAB_EXAM_ENDPOINT, USER_URL } from '../app.constants';
import { DoctorsResponse, SchedluedAppointmentsResponse } from '../dto/response/scheduled-appointment-response';
import { AppointedPatients } from '../dto/response/appointed.patient';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAppointmentService {
      constructor(private httpClient: HttpClient) {
      }

      getDoctors() {
        let token = localStorage.getItem('token')
        let authHeader = 'Bearer ' + token;
        return this.httpClient.get<DoctorsResponse>(USER_URL+"/users/doctors", {
          headers: {
              'Authorization': authHeader
          }
      });
      }

      getScheduledAppointments(timestamp: string,page:number,pageSize:number) {
          let lbz = localStorage.getItem('lbz')
          let token = localStorage.getItem('token')
          let authHeader = 'Bearer ' + token;
          return this.httpClient.get<SchedluedAppointmentsResponse>(SCHED_MED_EXAM_ENDPOINT+"/search?lbz="+lbz+"&page="+page+"&size="+pageSize+"&appointmentDate="+timestamp, {
            headers: {
                'Authorization': authHeader
            }
        });
      }

      getScheduledLabAppointments(lbp:string,date:string){
        {
          let token = localStorage.getItem('token')
          let authHeader = 'Bearer ' + token;

          return this.httpClient.get<AppointedPatients>(SCHED_LAB_EXAM_ENDPOINT+"?lbp="+lbp+"&date="+date, {
            headers: {
                'Authorization': authHeader
            }
        });
      }
    }

    //promeni dodaj promeni statusa
    changeExaminationStatus(status:string,lbp:string,date:string){
      {
        let token = localStorage.getItem('token')
        let authHeader = 'Bearer ' + token;

        return this.httpClient.put<AppointedPatients>(SCHED_LAB_EXAM_ENDPOINT+"?lbp="+lbp+"date="+date, {
          headers: {
              'Authorization': authHeader
          }
      });
    }
  }

      getScheduledAppointmentsByLbz(timestamp: string, doctorLbz: string, page: number, pageSize: number) {
        let lbz = doctorLbz
        let token = localStorage.getItem('token')
        let authHeader = 'Bearer ' + token;
        return this.httpClient.get<SchedluedAppointmentsResponse>(SCHED_MED_EXAM_ENDPOINT+"/search?lbz="+lbz+"&page="+page+"&size="+pageSize+"&appointmentDate="+timestamp, {
          headers: {
              'Authorization': authHeader
          }
      });
      }
}
