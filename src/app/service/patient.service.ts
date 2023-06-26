import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CREATE_HEALTH_REPORT_ENDPOINT, DISCHARGE_LIST_ENDPOINT,  HOSPITALIZATION_ENDPOINT, PATIENT_ENDPOINT, PATIENT_URL, SCHED_MED_EXAM_ENDPOINT, USER_URL} from '../app.constants';
import { PatientConditionRequest, PatientRequest } from '../dto/request/patient.request';
import { PatientResponse, SearchPatientsResponse } from '../dto/response/patient.response';
import { HospitalResponse, HospitalsByDepartmentResponse } from '../dto/response/hospital.response';
import { DepartmentResponse } from '../dto/response/department.response';
import { ScheduleAppointmentRequest } from "../dto/request/patient.request";
import {PatientAppointmentResponse} from "../dto/response/patient-appointment";
import { PatientConditionResponse } from '../dto/response/condition-history.response';

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

  getHospitalisedPatients(query: any) {
    const params: any = {};
    if (query.firstName !== '') params.firstName = query.firstName;
    if (query.lastName !== '') params.lastName = query.firstName;
    if (query.jmbg !== '') params.jmbg = query.jmbg;
    if (query.lbp !== '') params.lbp = query.lbp;
    if (query.page !== undefined) params.page = query.page;
    if (query.size !== undefined) params.size = query.size;
    if (query.includeDeleted !== undefined) params.includeDeleted = query.includeDeleted;
    return this.httpClient.get<any>(PATIENT_URL+`/hospitalization/${query.pbo}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: params
    });
  }

  getHospitalisedPatientsByPbb(query: any) {
    const params: any = {};
    if (query.firstName !== '') params.firstName = query.firstName;
    if (query.lastName !== '') params.lastName = query.firstName;
    if (query.jmbg !== '') params.jmbg = query.jmbg;
    if (query.lbp !== undefined && query.lbp !== '') params.lbp = query.lbp;
    if (query.page !== undefined) params.page = query.page;
    if (query.size !== undefined) params.size = query.size;
    if (query.respirator !== undefined && query.respirator !== '') params.respirator = query.respirator;
    if (query.imunizovan !== undefined && query.imunizovan !== '') params.imunizovan = query.imunizovan;
    return this.httpClient.get<any>(PATIENT_URL+`/hospitalization/hospital/${localStorage.getItem('pbb')}`, {
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

  getAllDepartments() {
    return this.httpClient.get<DepartmentResponse[]>(USER_URL + '/departments', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getHospitalRooms(pbo: string, page: number, size: number) {
    return this.httpClient.get(PATIENT_URL + '/hospital-room', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        pbo: pbo,
        page: page,
        size: size
      }
    })
  }

  hospitalize(hospitalizeRequest: any) {
    return this.httpClient.post(PATIENT_URL + '/hospitalization/hospitalize', hospitalizeRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getAppointmentsForToday(lbp: string, page: number, size: number) {
    const params: any = {};
    if (lbp !== '') params.lbp = lbp;
    params.page = page;
    params.size = size;
    const todaysDate = new Date();
    todaysDate.setUTCHours(0, 0, 0, 0);
    // params.date = todaysDate.toISOString();
    return this.httpClient.get(PATIENT_URL + '/appointment', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  changeAppointmentStatus(id: number, status: string) {
    return this.httpClient.put(PATIENT_URL + `/appointment/change-status/${id}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        status: status
      }
    })
  }

  createAppointment(scheduleAppointmentRequest: ScheduleAppointmentRequest) {
    return this.httpClient.post<{}>(PATIENT_URL + '/appointment/create', scheduleAppointmentRequest, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getAppointments(lbp: string, date: string, page: number, size: number) {
    return this.httpClient.get<PatientAppointmentResponse>(PATIENT_URL + '/appointment', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        lbp: lbp,
        date: date,
        page: page,
        size: size
      }
    });
  }

  cancelAppointment(id: any, status: string) {
    return this.httpClient.put<{}>(PATIENT_URL + `/appointment/change-status/${id}`,{}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        status: status
      }
    });
  }

  makeDischargeList(lbp:string,anamnesis: string,conclusion: string,diagnosis: string ,analasis: string,courseOfDisease: string,therapy: string,pbo:string){
    let sendObject= {
      attendDiagnoses: diagnosis,
      anamnesis: anamnesis,
      analasis: analasis,
      courseDisease: courseOfDisease,
      conclusion: conclusion,
      therapy: therapy,
      //pbo: pbo
    };

    return this.httpClient.post<any>(DISCHARGE_LIST_ENDPOINT+'/'+lbp,sendObject, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  makeHealthReport(lbp:string ,report: string,diagnosis: string,recommendedTherapy: string,advice: string,confidential: string) {
    const sendObject = {
      confidentIndicator: confidential,
      objectiveResult: report,
      diagnosis: diagnosis,
      proposedTherapy: recommendedTherapy,
      advice: advice,
    };
    return this.httpClient.post<any>(CREATE_HEALTH_REPORT_ENDPOINT+'/'+lbp, sendObject, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getPatientConditionByLbp(lbp: string, dateFrom: string, dateTo: string, page: number, size: number) {
    const params: any = {};
    if (dateFrom !== '') params.dateFrom = dateFrom;
    if (dateTo !== '') params.dateTo = dateTo;
    params.page = page;
    params.size = size;
    return this.httpClient.get(PATIENT_URL + `/hospitalization/patient-condition/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  getPatientMedicalReportHistory(lbp: string, dateFrom: string, dateTo: string, page: number, size: number) {
    const params: any = {};
    if (dateFrom !== '') params.dateFrom = dateFrom;
    if (dateTo !== '') params.dateTo = dateTo;
    params.page = page;
    params.size = size;
    return this.httpClient.get(PATIENT_URL + `/hospitalization/medical-report/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  getDischargeHistory(lbp: string, dateFrom: string, dateTo: string, page: number, size: number) {
    const params: any = {};
    if (dateFrom !== '') params.dateFrom = dateFrom;
    if (dateTo !== '') params.dateTo = dateTo;
    params.page = page;
    params.size = size;
    return this.httpClient.get(PATIENT_URL + `/hospitalization/discharge/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  getPatientsCondition(lbp:string,dateFrom:string,dateTo:string,page:number,pageSize:number){
    return this.httpClient.get<PatientConditionResponse>(HOSPITALIZATION_ENDPOINT+"/patient-condition/"+lbp, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        dateFrom: dateFrom,
        dateTo: dateTo,
        page: page,
        size: pageSize
      }
    });
  }
  registerPatientsCondition(conditionRequest:PatientConditionRequest,lbp:string){
    return this.httpClient.post<PatientConditionResponse>(HOSPITALIZATION_ENDPOINT+"/patient-condition/"+lbp, conditionRequest, {
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
  });
  }

  registerStationaryVisit(lbp: string, firstName: string, lastName: string, jmbg: string, note: string) {
    return this.httpClient.post(PATIENT_URL + `/visits/${lbp}`, {
      visitorFirstName: firstName,
      visitorLastName: lastName,
      jmbgVisitor: jmbg,
      note: note
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getStationaryVisitHistory(lbp: string, page: number, size: number) {
    return this.httpClient.get(PATIENT_URL + `/visits/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        page: page,
        size: size
      }
    })
  }

  getAvailableCovidTestingTerms(datetime: string) {
    return this.httpClient.get(PATIENT_URL + '/testing/available-terms', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        dateAndTime: datetime
      }
    })
  }
  getPatientCovidExamList(lbp: string, date: string, page:number ,  size:number){

    console.log("page "+page)
    let formatedDate:any;
    let params={};
    if(lbp && !date){
      params={page:page,size:size,lbp:lbp}
    }
    else if(date && !lbp){
        formatedDate=date.split("-")[2]+"/"+date.split("-")[1]+"/"+date.split("-")[0];
        params={page:page,size:size,date:formatedDate}
    }
    else if(date && lbp){
      formatedDate=date.split("-")[2]+"/"+date.split("-")[1]+"/"+date.split("-")[0];
      params={page:page,size:size,lbp:lbp,date:formatedDate}
    }
    else{
      params={page:page-1,size:size}
    }

      return this.httpClient.get<any>(SCHED_MED_EXAM_ENDPOINT +"/covid",  {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },params
      });
  }
  
  cancelExam(visitId: string){
      return this.httpClient.put<any>(SCHED_MED_EXAM_ENDPOINT +"/update-exam-status",{id:visitId, newStatus:"Otkazano"} , {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
      });

  }
  startExam(visitId: string){

  }

  scheduleCovidTest(lbp: string, datetime: string, note: string) {
    return this.httpClient.post(PATIENT_URL + `/testing/schedule/${lbp}`, {
      dateAndTime: datetime,
      note: note
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  scheduleCovidVaccination(lbp: string, datetime: string, note: string) {
    return this.httpClient.post(PATIENT_URL + `/vaccination/schedule/${lbp}`, {
      dateAndTime: datetime,
      note: note
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getScheduledCovidTests(lbp: string, date: string, page: number, size: number) {
    const params: any = {};
    if (lbp !== '') params.lbp = lbp;
    if (date !== '') params.date = date;
    params.page = page;
    params.size = size;
    return this.httpClient.get(PATIENT_URL + `/testing/scheduled`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  getScheduledCovidVaccinations(lbp: string, date: string, page: number, size: number) {
    const params: any = {};
    if (lbp !== '') params.lbp = lbp;
    if (date !== '') params.date = date;
    params.page = page;
    params.size = size;
    return this.httpClient.get(PATIENT_URL + `/vaccination/scheduled`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: params
    })
  }

  cancelScheduledCovidTest(id: number) {
    return this.httpClient.delete(PATIENT_URL + `/testing/scheduled/delete/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  cancelScheduledCovidVaccination(id: number) {
    return this.httpClient.delete(PATIENT_URL + `/vaccination/scheduled/delete/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  newCovidTest(request: any) {
    return this.httpClient.post(PATIENT_URL + `/testing/create/${request.lbp}`, {
      scheduledTestingId: request.scheduledId,
      reason: request.reason,
      temperature: request.temperature,
      bloodPressure: request.bloodPressure,
      pulse: request.pulse,
      appliedTherapies: request.appliedTherapies,
      description: request.description,
      collectedInfoDate: request.date
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  newCovidVaccination(request: any) {
    return this.httpClient.post(PATIENT_URL + `/vaccination/create/${request.lbp}`, {
      vaccinationId: request.scheduledId,
      dateTime: request.dateTime,
      vaccineName: request.vaccineName,
      doseReceived: request.doseReceived
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  getReceivedVaccinationDosage(lbp: string) {
    return this.httpClient.get(PATIENT_URL + `/vaccination/received-dosage/${lbp}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
  }

  changeCovidTestStatus(scheduledId: number, testStatus: string) {
    return this.httpClient.patch(PATIENT_URL + `/testing/scheduled/change-status/${scheduledId}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        testStatus: testStatus
      }
    })
  }

  changeCovidVaccinationStatus(scheduledId: number, testStatus: string) {
    return this.httpClient.patch(PATIENT_URL + `/vaccination/scheduled/change-status/${scheduledId}`, {}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      params: {
        vaccStatus: testStatus
      }
    })
  }

}


