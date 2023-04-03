export interface HealthRecordResponse {
    id: number;
    registrationDate:Date;
    bloodType: string;
    rhFactor: string;
    allergies: AllergyResponse;
    vaccinations: VaccineResponse;
    operations: Operation[];
    medicalHistory: MedicalHistory;
    medicalExaminations: MedicalExamination[];
    patientLbp: string;
}

export interface AllergyResponse {
    id: number;
    allergies: Allergen[];
    healthRecordId: number;
}

export interface Allergen {
    id: number;
    allergen: Allergy;
    healthRecordId: number;
}
export interface Allergy {
  id: number;
  name: string;
}
export interface VaccineResponse {
  vaccinations: VaccinationResponse[];
  count: number;
}

export interface VaccinationResponse {
    id: number;
    vaccine: Vaccine;
    healthRecordId: number;
    vaccinationDate: string;
}

export interface Vaccine {
    id: number;
    name: string;
    type: string;
    description: string;
    producer: string;
}

// export interface VaccineSecond {
//   id: number;
//   name: string;
//   type: string;
//   description: string;
// }

export interface Operation {
    id: number;
    date: Date;
    description: string;
    pbo: string;
}

export interface MedicalExaminationListResponse2 {
  examinations: MedicalExamination2[];
  count: number;
}

export interface MedicalExamination2 {
  advice: string;
  anamnesis: string;
  confidental: boolean;
  currentIllness: string;
  date: string;
  diagnosis: Diagnosis;
  familyAnamnesis: string;
  id: number;
  lbz: string;
  mainSymptoms: string;
  objectiveFinding: string;
  patientOpinion: string;
  suggestedTherapy: string;
}

export interface MedicalExaminationListResponse {
    examinations: MedicalExamination[];
}

export interface MedicalExamination {
    id: number;
    date: Date;
    confidential: boolean;
    mainSymptoms: string;
    currentIllness: string;
    anamnesis: string;
    familyAnamnesis: string;
    patientOpinion: string;
    objectiveFinding: string;
    suggestedTherapy: string;
    advice: string;
    lbz: string;
    diagnosis: Diagnosis;
}

export interface Diagnosis {
    id: number;
    code: string;
    description: string;
    latinDescription: string;
}

export interface MedicalHistory {
    count: number;
    history: History[];
}

export interface History {
  confidential: boolean;
  currentStateDescription: string;
  diagnosis: Diagnosis;
  id: number;
  illnessEnd: string;
  illnessStart: string;
  treatmentResult: TreatmentResult;
  valid: boolean;
  validFrom: string;
  validUntil: string;
}

export interface TreatmentResult {
  notation: string;
}

export interface LightHealthRecord {
    id: number;
    bloodType: string;
    rhFactor: string;
    allergies: AllergyResponse[];
    vaccinations: VaccinationResponse[];
    patientLbp: string;
}

export interface Allergenn {
  allergyResponse: AllergyRes;
  allergyCount: number;
}

export interface AllergyRes {
  id: number;
  allergen: Alle;
  healthRecordId: number;
}

export interface Alle {
  id: number;
  name: string;
}
