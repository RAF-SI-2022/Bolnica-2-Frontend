export interface LabExamResponse {
    lbp: string,
    scheduledDate: string,
    note: string,
    examStatus: string
}

export interface ReferralResponseList {
    referrals: ReferralResponse[],
    count: number
}

export interface ReferralResponse {
    id: number,
    type: { notation: string },
    lbz: string,
    pboReferredFrom: string,
    pboReferredTo: string,
    lbp: string,
    creationTime: string,
    status: { notation: string },
    requiredAnalysis: string,
    comment: string,
    referralDiagnosis: string,
    referralReason: string,
    deleted: boolean
}
