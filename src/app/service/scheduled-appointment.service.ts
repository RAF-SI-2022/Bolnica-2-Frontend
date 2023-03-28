import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PATIENT_ENDPOINT, SCHEDULE_ENDPOINT } from '../app.constants';
import { PatientResponse, SchedluedAppointmentsResponse } from '../dto/response/scheduled-appointment-response';

@Injectable({
  providedIn: 'root'
})
export class ScheduledAppointmentService {

      constructor(private httpClient: HttpClient) {
      }

      getScheduledAppointments(timestamp: string) {
        let lbz = localStorage.getItem('lbz')
        let token = localStorage.getItem('token')
        let authHeader = 'Bearer ' + token;
        return this.httpClient.get<SchedluedAppointmentsResponse>(SCHEDULE_ENDPOINT+"/search?lbz="+lbz, {
          headers: {
              'Authorization': authHeader
          }
      });
      }

      getPatientByLbp(patientLbp: string) {
        let lbz = localStorage.getItem('lbz')
        let token = localStorage.getItem('token')
        let authHeader = 'Bearer ' + token;
        return this.httpClient.get<PatientResponse>(PATIENT_ENDPOINT+"/"+patientLbp, {
          headers: {
              'Authorization': authHeader
          }
      });
    }

    getAppointmentsByDoctorAndDate(timestamp: Date) {
      throw new Error('Method not implemented.');
    }
}
