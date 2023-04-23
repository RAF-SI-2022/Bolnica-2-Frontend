export interface Referral {
    id: number;
    type: ReferralType;
    creationTime: Date;
    status: ReferralStatus;
    requiredAnalysis: string;
    comment: string;
    referralDiagnosis: string;
    referralReason: string;
    labWorkOrderId: number;
    analysisParameters: AnalysisParameter[];
    lbz: string;
    pboReferredFrom: string;
    pboReferredTo: string;
    lbp: string;
}

export interface AnalysisParameter {
    id: number;
    analysisId: number;
    parameterId: number;
    analysisParameterResults: AnalysisParameterResult[];
}

export interface AnalysisParameterResult {
    id: number;
    labWorkOrderId: number;
    analysisParameterId: number;
    result: string;
    dateAndTime: Date;
    lbzBiochemist: string;
}

export interface LabAnalysis {
    id: number;
    name: string;
    abbreviation: string;
    analysisParameters: AnalysisParameter[];
}

export interface LabWorkOrder {
    id: number;
    creationTime: Date;
    status: OrderStatus;
    referral: Referral;
    analysisParameterResults: AnalysisParameterResult[];
    lbp: string;
    lbzTechnician: string;
    lbzBiochemist: string;
}

export interface ParameterDto {
    id: number;
    name: string;
    type: ParameterType;
    measureUnit: string;
    lowerBound: number;
    upperBound: number;
}

export interface ScheduledLabExamDto {
    id: number;
    scheduledDate: Date;
    examStatus: string;
    note: string;
    pbo: string;
    lbp: string;
    lbz: string;
}

export enum ParameterType {
    NUMERICKA ="Numerička",
    TEKSTUALNA = "Tekstualna"
}

export enum OrderStatus {
    NEOBRADJEN="Neobrađen",
    U_OBRADI="U obradi",
    OBRADJEN="Obrađen"
}

export enum ReferralStatus {
    NEREALIZOVAN="Nerealizovan",
    REALIZOVAN="Realizovan"
}

export enum ReferralType {
    LABORATORIJA="Laboratorija",
    DIJAGNOSTIKA="Dijagnostika",
    STACIONAR="Stacionar"
}

export enum ExamStatus {
    ZAKAZANO="Zakazano",
    OTKAZANO="Otkazano",
    ZAVRSENO="Završeno"
}