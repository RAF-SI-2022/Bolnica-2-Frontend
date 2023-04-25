import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateLabExamRequest, CreateReferralRequest } from '../dto/request/laboratory.request';
import { LabExamResponse, ReferralResponseList, ReferralResponse } from '../dto/response/laboratory.response';
import {HEALTH_RECORD_ENDPOINT, LAB_URL} from '../app.constants';
import {MedicalHistory} from "../dto/response/health-record.response";
import {OrderHistoryRequest, OrderHistoryResponse} from "../dto/request/issued-results.request";

@Injectable({
    providedIn: 'root'
})
export class LabService {
    constructor(private httpClient: HttpClient) {
    }

    createLabExamination(createLabExamRequest: CreateLabExamRequest) {
        return this.httpClient.post<LabExamResponse>(LAB_URL + '/examination/create', createLabExamRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getLabExaminationCount(date: string) {
        return this.httpClient.get(LAB_URL + '/examination/scheduled-count', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                date: date
            }
        })
    }

    getUnprocessedReferrals(lbp: string) {
        return this.httpClient.get<ReferralResponseList>(LAB_URL + '/referral/unprocessed', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                lbp: lbp
            }
        })
    }

    getUnprocessedReferralsV2(lbp: string) {
        return this.httpClient.get(LAB_URL + '/referral/unprocessed', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                lbp: lbp
            }
        })
    }

    createReferral(createReferralRequest: CreateReferralRequest) {
        return this.httpClient.post<ReferralResponse>(LAB_URL + '/referral/create', createReferralRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getReferralHistory(lbp: string, startDate: string, endDate: string, page: number, size: number) {
        const params: any = {};
        params.lbp = lbp;
        if (startDate === '') params.startDate = '1970-01-01T23:59:20.253Z'; else params.startDate = startDate + 'T00:00:00.253Z';
        if (endDate === '') params.endDate = '2500-04-23T11:16:20.253Z'; else params.endDate = endDate + 'T00:00:00.253Z';
        return this.httpClient.get<ReferralResponseList>(LAB_URL + '/referral/history', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                lbp: params.lbp,
                dateFrom: params.startDate,
                dateTo: params.endDate,
                page: page,
                size: size
            }
        })
    }

    deleteReferral(id: number) {
        return this.httpClient.delete<ReferralResponse>(LAB_URL + `/referral/delete/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getSchedLabExaminations(lbp: string, date: string) {
        const params: any = {};
        if (lbp === '') params.lbp = ''; else params.lbp = lbp;
        if (date === '') params.date = ''; else params.date = date;
        return this.httpClient.get(LAB_URL + '/examination/scheduled', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                lbp: params.lbp,
                date: params.date
            }
        })
    }

    getWorkOrderHistoryDoc(lbp: string, dateFrom: string, dateTo: string) {
        if (dateFrom === '') dateFrom = '1970-01-01'
        if (dateTo === '') dateTo = '2500-01-01'
        return this.httpClient.post(LAB_URL + '/order/history', { lbp: lbp, startDate: dateFrom, endDate: dateTo }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    updateLabExamStatus(id: number, status: string) {
        return this.httpClient.put(LAB_URL + '/examination/status', { id: id, status: status }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    createWorkOrder(id: number) {
        return this.httpClient.post(LAB_URL + `/order/create/${id}`, undefined, {
            headers: {
                'Authorization': 'Beare'
            }
        })
    }

    getIssuedResults(lbp: string, startDate: string, endDate: string, page: number, size: number) {
      const params: any = {};
      params.lbp = lbp;
      if (startDate === '') params.startDate = '1970-01-01T23:59:20.253Z'; else params.startDate = startDate + 'T00:00:00.253Z';
      if (endDate === '') params.endDate = '2500-04-23T11:16:20.253Z'; else params.endDate = endDate + 'T00:00:00.253Z';
      const orderHistoryRequest: OrderHistoryRequest = {
        lbp: lbp,
        startDate: params.startDate,
        endDate: params.endDate
      }
      return this.httpClient.post<OrderHistoryResponse>(LAB_URL + `/order/history`, orderHistoryRequest, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {
          page: page,
          size: size
        }
      });
    }

    getIssuedResultsLab(lbp: string, startDate: string, endDate: string, page: number, size: number) {
        const params: any = {};
        params.lbp = lbp;
        if (startDate === '') params.startDate = '1970-01-01T23:59:20.253Z'; else params.startDate = startDate + 'T00:00:00.253Z';
        if (endDate === '') params.endDate = '2500-04-23T11:16:20.253Z'; else params.endDate = endDate + 'T00:00:00.253Z';
        const orderHistoryRequest: any = {
          lbp: lbp,
          startDate: params.startDate,
          endDate: params.endDate,
          orderStatus: ''
        }
        return this.httpClient.post<OrderHistoryResponse>(LAB_URL + `/order/historyForLab`, orderHistoryRequest, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          params: {
            page: page,
            size: size
          }
        });
      }
}
