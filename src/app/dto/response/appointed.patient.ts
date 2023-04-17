export interface AppointedPatients {
    userList: AppointedPatient[],
    count: number
}

/*
export interface AppointedPatient {
    attributeName: string,
    labExaminationId: string,
    departmentId: string,
    lbp: string,
    scheduledDate: Date,
    examStatus: ExamStatus,
    note: string,
    lbz: string
}


interface ExamStatus{
    notation:string
}*/
export interface AppointedPatient {
    lbp: string,
    scheduledDate: Date,
    note: string,
    examStatus: ExamStatus,
}

export interface ExamStatus{
    notation: string
}