export interface SchedluedAppointmentsResponse{
    count:number,
    schedMedExamResponseList: Array<SchedMedAppointment>
}
export interface SchedMedAppointment{
    appointmentDate:Date,
    patientArrivalStatus:PatientArrivalStatus,
    patientResponse:PatientResponse
}

export interface PatientResponse{
    firstName:string,
    lastName:string,
    birthDate:Date,
    gender:GenderResponse
    lbp: string
}

export interface DoctorsResponse{
    lbz:string,
    firstName:string,
    lastName:string
}

export interface GenderResponse{
    notation:string;
}

export interface ExaminatonStatusResponse{
    examinationStatus:string
}
export interface PatientArrivalStatus{
    patientArrivalStatus:string
}