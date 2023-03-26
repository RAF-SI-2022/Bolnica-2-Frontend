import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PATIENT_ENDPOINT } from '../app.constants';
import { PatientResponse, SearchPatientsResponse } from '../dto/response/patient.response';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) {

   }

  getPatientById(id: number){
    return this.httpClient.get<PatientResponse>(PATIENT_ENDPOINT + `/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
  }

  searchPatients(query: any) {
    return this.httpClient.get<SearchPatientsResponse>(PATIENT_ENDPOINT, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {
            firstName: query.firstName,
            lastName: query.lastName,
            jmbg: query.jmbg,
            lbp: query.lbp,
            includeDeleted: query.includeDeleted,
            page: query.page,
            size: query.size
        }
    });
}

}