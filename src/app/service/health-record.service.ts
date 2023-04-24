import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HEALTH_RECORD_ENDPOINT, LAB_URL, ORDER_ENDPOINT, REFERRAL_ENDPOINT, SCHED_MED_EXAM_ENDPOINT } from '../app.constants';
import {
  AllergenResponse,
  HealthRecordResponse,
  LightHealthRecord, MedicalExaminationListResponse,
  MedicalHistory,
  VaccinationResponse
} from '../dto/response/health-record.response';
import {
  UpdateHealthRecordRequest,
  AddVaccinationRequest,
  Allergen,
  MedicalExamination
} from "../dto/request/health-record.request";
import {constrainPoint} from "@fullcalendar/core/internal";
import { UnprocessedReferral } from '../dto/response/unprocessed.refferal';
import { catchError, map, of, pipe } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HealthRecordService {
  constructor(private httpClient: HttpClient) {
  }

  addHealthRecord(lbp: string) {
    return this.httpClient.post<HealthRecordResponse>(HEALTH_RECORD_ENDPOINT + `/examinations/${lbp}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
    });
  }

  addAllergy(allergyRequest: AllergenResponse) {
    const lbp = localStorage.getItem('patientLBP');
    return this.httpClient.put<AllergenResponse>(HEALTH_RECORD_ENDPOINT + `/add-alergy/${lbp}`, allergyRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    });
  }


  addVaccine(vaccineRequest: AddVaccinationRequest) {
    const lbp = localStorage.getItem('patientLBP');
    return this.httpClient.put<VaccinationResponse>(HEALTH_RECORD_ENDPOINT + `/add-vaccination/${lbp}`, vaccineRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  updateHealthRecord(updateHealthRecordRequest: UpdateHealthRecordRequest) {
    const lbp = localStorage.getItem('patientLBP');
    console.log(updateHealthRecordRequest.blodtype);
    updateHealthRecordRequest.rhfactor = updateHealthRecordRequest.rhfactor[0];
    return this.httpClient.put<HealthRecordResponse>(HEALTH_RECORD_ENDPOINT + `/${lbp}`, updateHealthRecordRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
  getRecord(lbp: string) {
    return this.httpClient.get<HealthRecordResponse>(HEALTH_RECORD_ENDPOINT + `/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getLightHealthRecord(lbp: string) {
    return this.httpClient.get<LightHealthRecord>(HEALTH_RECORD_ENDPOINT + `/light/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getMedicalHistory(query: any) {
    const params: any = {};
    if(query.mkb10 !== '') params.mkb10 = query.mkb10;
    params.page = query.page;
    params.size = query.size;
    let lbp = localStorage.getItem('patientLBP')!;
    return this.httpClient.get<MedicalHistory>(HEALTH_RECORD_ENDPOINT + `/history/${lbp}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: params
    });
  }

  getFullMedicalHistory(lbp: string) {
    return this.httpClient.get<MedicalHistory>(HEALTH_RECORD_ENDPOINT + `/history/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getMedicalExamination(medicalExamination: MedicalExamination, page: number, size: number) {
    let lbp = localStorage.getItem('patientLBP')!;
    const body: any = {};
    if (medicalExamination.startDate !== '') body.startDate = medicalExamination.startDate;
    if (medicalExamination.endDate !== '') body.endDate = medicalExamination.endDate;
    return this.httpClient.post<MedicalExaminationListResponse>(HEALTH_RECORD_ENDPOINT + `/examinations/${lbp}`, medicalExamination,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  createExaminationReport(lbp: string, lbz: string, confidential: boolean, mainSymptoms: string, currentIllness: string, anamnesis: string, familyAnamnesis: string,
                          patientOpinion: string, objectiveFinding: string, suggestedTherapy: string, advice: string, diagnosis: string, existingDiagnosis: string,
                          treatmentResult: string, currentStateDescription: string) {
    return this.httpClient.post<any>(HEALTH_RECORD_ENDPOINT + `/create-examination-report/${lbp}?lbz=${lbz}`,
      {
        confidential,
        mainSymptoms,
        currentIllness,
        anamnesis,
        familyAnamnesis,
        patientOpinion,
        objectiveFinding,
        suggestedTherapy,
        advice,
        diagnosis,
        existingDiagnosis,
        treatmentResult,
        currentStateDescription
      }
      , {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
  }
  getUnprocessedReferrals(lbp:string){
        
        let token = localStorage.getItem('token')
        let authHeader = 'Bearer ' + token;
        return this.httpClient.get<UnprocessedReferral[]>(REFERRAL_ENDPOINT+"/unprocessed?lbp="+lbp, {
          headers: {
              'Authorization': authHeader
          }
      });
      
  }

  createWorkOrder(orderId:number){


    let token = localStorage.getItem('token')
    let authHeader = 'Bearer ' + token;
    return this.httpClient.post(ORDER_ENDPOINT + "/create/" + orderId, {}, {
      headers: {
        'Authorization': authHeader
      },
      observe: 'response'
    }).pipe(
      map(response => response.status),
      catchError(error => {
        console.error(error);
        return of(error.status || 500);
      })
    );
}

}
