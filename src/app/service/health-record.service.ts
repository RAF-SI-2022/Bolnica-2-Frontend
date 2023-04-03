import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEALTH_RECORD_ENDPOINT } from '../app.constants';
import {
  Allergenn,
  HealthRecordResponse,
  LightHealthRecord, MedicalExamination2, MedicalExaminationListResponse, MedicalExaminationListResponse2,
  MedicalHistory,
  VaccineResponse
} from '../dto/response/health-record.response';
import {
  UpdateHealthRecordRequest,
  AddVaccinationRequest,
  Allergen,
  MedicalExamination
} from "../dto/request/health-record.request";
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

  addAllergy(allergyRequest: Allergen) {
    const lbp = localStorage.getItem('patientLBP');
    return this.httpClient.put<Allergenn>(HEALTH_RECORD_ENDPOINT + `/add-alergy/${lbp}`, allergyRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    });
  }


  addVaccine(vaccineRequest: AddVaccinationRequest) {
    const lbp = localStorage.getItem('patientLBP');
    console.log('Vakcina: ' + vaccineRequest.vaccine)
    console.log('Datum: ' + vaccineRequest.date);
    return this.httpClient.put<VaccineResponse>(HEALTH_RECORD_ENDPOINT + `/add-vaccination/${lbp}`, vaccineRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  updateHealthRecord(updateHealthRecordRequest: UpdateHealthRecordRequest) {
    const lbp = localStorage.getItem('patientLBP');
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
    console.log(query.mkb10)
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

  getMedicalExamination(medicalExamination: MedicalExamination) {
    let lbp = localStorage.getItem('patientLBP')!;
    return this.httpClient.post<MedicalExaminationListResponse2>(HEALTH_RECORD_ENDPOINT + `/examinations/${lbp}`, medicalExamination,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

}
