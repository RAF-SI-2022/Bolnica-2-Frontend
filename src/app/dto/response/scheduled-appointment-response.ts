export interface SchedluedAppointmentsResponse{
    id:number,
    lbp:string,
    lbz:string,
    appointmentDate:Date,
    note:string,
    lbzNurse:string,
    examinationStatus:ExaminatonStatusResponse
}

export interface PatientResponse{
    firstName:string,
    lastName:string,
    birthDate:Date,
    gender:GenderResponse

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