import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateLabExamRequest, CreateReferralRequest } from '../dto/request/laboratory.request';
import { LabExamResponse, ReferralResponseList, ReferralResponse } from '../dto/response/laboratory.response';
import { LAB_URL } from '../app.constants';

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

    createReferral(createReferralRequest: CreateReferralRequest) {
        return this.httpClient.post<ReferralResponse>(LAB_URL + '/referral/create', createReferralRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}