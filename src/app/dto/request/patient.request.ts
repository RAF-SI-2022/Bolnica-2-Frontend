export interface PatientRequest {
  jmbg: string;
  firstName: string;
  parentName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  deathDate: string;
  birthplace: string;
  citizenshipCountry: string;
  address: string;
  placeOfLiving: string;
  countryOfLiving: string;
  phoneNumber: string;
  email: string;
  custodianJmbg: string;
  custodianName: string;
  familyStatus: string;
  maritalStatus: string;
  childrenNum: number;
  education: string;
  profession: string;
}

export interface CreateScheduledAppointmentRequest {
  lbp: string,
  lbzDoctor: string,
  appointmentDate: string,
  note: string,
  lbzNurse: string
}

export interface SpecialistDoctorExaminationRequest {
  lbp: string,
  lbz: string,
  mainSymptoms: string,
  currentIllness: string,
  anamnesis: string,
}

