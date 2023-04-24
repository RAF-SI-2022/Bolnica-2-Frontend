export interface OrderHistoryRequest {
  startDate: string;
  endDate: string;
  lbp: string;
}

export interface OrderHistoryResponse {
  count: number;
  orderList: OrderList[];
}

export interface OrderList {
  analysisParameterResults: AnalysisParameterRes[];
  creationTime: string;
  id: number;
  lbp: string;
  lbzBiochemist: string;
  lbzTechnician: string;
  referralId: number;
  status: Status;
}

export interface Status {
  notation: string;
}
export interface AnalysisParameterRes {
  analysis: Analysis;
  dateAndTime: string;
  id: number;
  lbzBiochemist: string;
  parameter: Param;
  result: string;
}

export interface Analysis {
  abbreviation: string;
  id: number;
  name: string;
}

export interface Param {
  id: number;
  lowerBound: number;
  measureUnit: string;
  name: string;
  type: string;
  upperBound: number;
}
