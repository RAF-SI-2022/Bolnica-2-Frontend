import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PATIENT_ENDPOINT } from '../app.constants';
import { PatientRequest } from '../dto/request/patient.request';
import { PatientResponse, SearchPatientsResponse } from '../dto/response/patient.response';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private httpClient: HttpClient) {
  }

  addPatient(patient: PatientRequest) {
    return this.httpClient.post<PatientResponse>(PATIENT_ENDPOINT + '/create', patient, {
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
          id: query.id,
          jmbg: query.jmbg,
          lbp: query.lbp,
          firstName: query.firstName,
          parentName: query.parentName,
          lastName: query.lastName,
          gender: query.gender,
          birthDate: query.birthDate,
          deathDate: query.deathDate,
          birthPlace: query.birthPlace,
          citizenshipCountry: query.citizenshipCountry,
          address: query.address,
          placeOfLiving: query.placeOfLiving,
          countryOfLiving: query.countryOfLiving,
          phoneNumber: query.phoneNumber,
          email: query.email,
          custodianJmbg: query.custodianJmbg,
          custodianName: query.custodianName,
          familyStatus: query.familyStatus,
          maritalStatus: query.maritalStatus,
          childrenNum: query.childrenNum,
          education: query.education,
          profession: query.profession,
          healthRecordId: query.healthRecordId
        }
    });
  }

  getPatientByLbp(lbp: string) {
    return this.httpClient.get<PatientResponse>(PATIENT_ENDPOINT + `/${lbp}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
  }

  deletePatient(lbp: string) {
    return this.httpClient.delete<PatientResponse>(PATIENT_ENDPOINT + `/delete/${lbp}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
  }

  updatePatient(updatePatientRequest: PatientRequest) {
    return this.httpClient.put<PatientResponse>(PATIENT_ENDPOINT + `/update`, updatePatientRequest, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }

  updatePatientByLbp(lbp: string, updatePatientRequest: PatientRequest) {
    return this.httpClient.put<PatientResponse>(PATIENT_ENDPOINT + `/update/${lbp}`, updatePatientRequest, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
  }
}