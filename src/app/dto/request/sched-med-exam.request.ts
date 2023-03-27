export interface SchedMedExamRequest {
    lbp: string;
    lbzDoctor: string;
    appointmentDate: Date;
    note: string;
    lbzNurse: string;
}

export interface UpdateSchedMedExamRequest {
    id: number;
    newStatus: string;
}

export interface DateBetweenRequest{
    startDate: Date;
    endDate: Date;
}