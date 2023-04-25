export interface CreateLabExamRequest {
    lbp: string,
    scheduledDate: string,
    note: string
}

export interface CreateReferralRequest {
    type: string,
    lbz: string,
    pboReferredFrom: string,
    pboReferredTo: string,
    lbp: string,
    creationTime: string,
    requiredAnalysis: string,
    comment: string,
    referralDiagnosis: string,
    referralReason: string
}
