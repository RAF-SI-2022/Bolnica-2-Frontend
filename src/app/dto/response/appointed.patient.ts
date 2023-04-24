export interface AppointedPatient {
    id: number,
    /*pbo: string,*/
    lbp: string,
    scheduledDate: Date,
    note: string,
    examStatus: ExamStatus,
    lbz: string,
}

export interface ExamStatus{
    notation: string
}