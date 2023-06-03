export interface PatientConditionResponse{
count:number,
patientConditionList:Array<PatientCondition>
}
export interface PatientCondition{
    appliedTherapies : string,
    bloodPressure: string,
    collectedInfoDate: string,
    description: string,
    lbp:   string,
    pulse: string,
    registerLbz: string,
    temperature: string,
}