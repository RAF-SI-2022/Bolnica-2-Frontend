import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HEALTH_RECORD_ENDPOINT } from '../app.constants';
import { HealthRecordResponse, LightHealthRecord, MedicalHistory } from '../dto/response/health-record.response';

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
        }
    });
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

  getMedicalHistory(lbp: string) {
    return this.httpClient.get<MedicalHistory>(HEALTH_RECORD_ENDPOINT + `/history/${lbp}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
  }
}