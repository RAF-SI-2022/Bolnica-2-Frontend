export interface SchedMedExamResponse {
    id: number;
    lbp: string;
    appointmentDate: Date;
    note: string;
    lbzNurse: string;
    examinationStatus: ExaminationStatus;
    patientArrivalStatus: PatientArrivalStatus;
}

interface ExaminationStatus{
    notation: string;
}

interface PatientArrivalStatus{
    notation: string;
}