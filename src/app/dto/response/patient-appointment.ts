export interface PatientAppointmentResponse {
  appointments: AppointmentList[];
  count: number;
}

export interface AppointmentList {
  employeeLBZ: string;
  id: number;
  lbp: string;
  note: string;
  pbo: string;
  receiptDate: string;
  status: StatusNotation
}

export interface StatusNotation {
  notation: string;
}
