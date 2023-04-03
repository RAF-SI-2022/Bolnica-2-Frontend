export interface SchedMedExamResponse {
    id: number;
    lbp: string;
    lbzDoctor: string;
    appointmentDate: Date;
    note: string;
    lbzNurse: string;
    examinationStatus: ExaminationStatus;
    patientArrivalStatus: PatientArrivalStatus;
}

export interface ExaminationStatus {
    examinationStatus: string;
}

export interface PatientArrivalStatus {
    patientArrivalStatus: string;
}

export interface SchedMedExamResponseList {
    schedMedExamResponseList: SchedMedExamResponse[],
    count: number
}
