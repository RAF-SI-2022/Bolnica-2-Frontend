import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SHED_MED_EXAM_ENDPOINT } from '../app.constants';
import { SchedMedExamRequest, UpdateSchedMedExamRequest} from '../dto/request/sched-med-exam.request';
import { SchedMedExamResponse } from '../dto/response/sched-med-exam.response';

@Injectable({
  providedIn: 'root'
})
export class SchedMedExamService {
  constructor(private httpClient: HttpClient) {
  }

  addSchedMedExam(sme: SchedMedExamRequest) {
    return this.httpClient.post<SchedMedExamResponse>(SHED_MED_EXAM_ENDPOINT + '/create', sme, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
}
  updatePatientArrivalStatus(sme: UpdateSchedMedExamRequest) {
    return this.httpClient.put<UpdateSchedMedExamRequest>(SHED_MED_EXAM_ENDPOINT + `/update-patient-arrival-status`, sme, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }

  updatePatientExamStatus(sme: UpdateSchedMedExamRequest) {
    return this.httpClient.put<UpdateSchedMedExamRequest>(SHED_MED_EXAM_ENDPOINT + `/update-patient-exam-status`, sme, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }
}