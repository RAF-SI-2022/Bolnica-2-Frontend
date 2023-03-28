export interface SchedMedExamResponse {
    id: number;
    lbp: string;
    lbzDoctor: string;
    appointmentDate: Date;
    note: string;
    lbzNurse: string;
    examinationStatus: string;
    patientArrivalStatus: string;
}