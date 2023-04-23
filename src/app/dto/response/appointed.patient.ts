export interface AppointedPatient {
    lbp: string,
    scheduledDate: Date,
    note: string,
    examStatus: ExamStatus,
}

export interface ExamStatus{
    notation: string
}