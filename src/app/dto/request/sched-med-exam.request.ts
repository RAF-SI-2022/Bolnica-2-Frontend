export interface CreateSchedMedExamRequest {
    lbp: string;
    lbzDoctor: string;
    appointmentDate: string;
    note: string;
    lbzNurse: string;
    covid: boolean
}

export interface UpdateSchedMedExamRequest {
    id: number;
    newStatus: string;
}

export interface DateBetweenRequest{
    startDate: Date;
    endDate: Date;
}