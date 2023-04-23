import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PATIENT_ENDPOINT, USER_URL } from '../app.constants';
import { PatientRequest } from '../dto/request/patient.request';
import { PatientResponse, SearchPatientsResponse } from '../dto/response/patient.response';
import { HospitalResponse, HospitalsByDepartmentResponse } from '../dto/response/hospital.response';

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
    const params: any = {};
    if (query.firstName !== '') params.firstName = query.firstName;
    if (query.lastName !== '') params.lastName = query.firstName;
    if (query.jmbg !== '') params.jmbg = query.jmbg;
    if (query.lbp !== '') params.lbp = query.lbp;
    if (query.page !== undefined) params.page = query.page;
    if (query.size !== undefined) params.size = query.size;
    if (query.includeDeleted !== undefined) params.includeDeleted = query.includeDeleted;
    return this.httpClient.get<any>(PATIENT_ENDPOINT, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: params
    });
  }

  getPatients(query: any) {
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

  getHospitals() {
    return this.httpClient.get<HospitalResponse[]>(USER_URL + '/departments/hospitals', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getHospitalsWithDepartment(departmentName: string) {
    return this.httpClient.get<HospitalsByDepartmentResponse[]>(USER_URL + `/departments/name/${departmentName}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }
}

