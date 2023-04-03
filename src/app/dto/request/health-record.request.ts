export interface UpdateHealthRecordRequest {
  blodtype: string;
  rhfactor: string;
}

export interface AddVaccinationRequest {
  vaccine: string;
  date: string;
}

export interface Allergen {
  allergen: string;
}

export interface MedicalExamination {
  startDate: string;
  endDate: string;
}
