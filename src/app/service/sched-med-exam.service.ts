import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SCHED_MED_EXAM_ENDPOINT } from '../app.constants';
import { CreateSchedMedExamRequest, UpdateSchedMedExamRequest} from '../dto/request/sched-med-exam.request';
import { SchedMedExamResponse, SchedMedExamResponseList } from '../dto/response/sched-med-exam.response';

@Injectable({
  providedIn: 'root'
})
export class SchedMedExamService {
  constructor(private httpClient: HttpClient) {
  }

  updatePatientArrivalStatus(sme: UpdateSchedMedExamRequest) {
    return this.httpClient.put<SchedMedExamResponse>(SCHED_MED_EXAM_ENDPOINT + `/update-patient-arrival-status`, sme, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }

  updatePatientExamStatus(sme: UpdateSchedMedExamRequest) {
    return this.httpClient.put<SchedMedExamResponse>(SCHED_MED_EXAM_ENDPOINT + `/update-patient-exam-status`, sme, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }

  scheduleAppointment(appointment: CreateSchedMedExamRequest) {
    return this.httpClient.post<SchedMedExamResponse>(SCHED_MED_EXAM_ENDPOINT + '/create', appointment, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
  }

  searchScheduledAppointments(query: any) {
    const params: any = {};
    if (query.appointmentDate !== undefined) params.appointmentDate = query.appointmentDate;
    params.lbz = query.lbz;
    return this.httpClient.get<SchedMedExamResponseList>(SCHED_MED_EXAM_ENDPOINT + '/search', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  deleteScheduledAppointment(appointmentId: number) {
    return this.httpClient.delete<SchedMedExamResponse>(SCHED_MED_EXAM_ENDPOINT + `/delete/${appointmentId}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}