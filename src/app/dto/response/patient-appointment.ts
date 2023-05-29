export interface PatientAppointmentResponse {
  appointments: AppointmentList[];
  count: number;
}

export interface AppointmentList {
  id: number;
  patient: Patient;
  receiptDate: string;
  note: string;
  status: Status;
}

export interface Status {
  notation: string;
}

export interface Patient {
  address: string;
  birthDate: string;
  firstName: string;
  lastName: string;
}
