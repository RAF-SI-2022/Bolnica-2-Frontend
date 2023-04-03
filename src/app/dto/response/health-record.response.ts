export interface HealthRecordResponse {
    id: number;
    registrationDate:Date;
    bloodType: string;
    rhFactor: string;
    allergies: AllergyResponse;
    vaccinations: VaccinationResponse;
    operations: Operation[];
    medicalHistory: MedicalHistory;
    medicalExaminations: MedicalExamination[];
    patientLbp: string;
}

export interface AllergyResponse {
    allergies: Allergy[];
    count: number;
}

export interface Allergy {
    id: number;
    allergen : Allergen2;
    healthRecordId: number;
}

export interface Allergen2 {
  name: string;
}

export interface AllergenResponse {
  allergen: string;
}


export interface VaccinationResponse {
    vaccinations: Vaccinations[];
    count: number;
}

export interface Vaccinations {
    id: number;
    vaccine: Vaccine;
    healthRecordId: number;
    vaccinationDate: Date;
}

export interface Vaccine {
    id: number;
    name: string;
    type: string;
    description: string;
}

export interface Operation {
    id: number;
    date: Date;
    description: string;
    pbo: string;
}

export interface MedicalExaminationListResponse {
    examinations: MedicalExamination[];
    count: number;
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

export interface HistoryHealthRecord {
  illnessStart: string;
  illnessEnd: string;
  id: number;
  diagnosis: DiagnosisHealthRecord;
  treatmentResult: TreatmentResultHealthRecord;
  currentStateDescription: string;
}

export interface TreatmentResultHealthRecord {
  notation: string;
}

export interface DiagnosisHealthRecord {
  description: string;
  code: number;
}

export interface MedicalHistory {
    id: number;
    history: HistoryHealthRecord[];
    confidential: boolean;
    illnessStart: Date;
    illnessEnd: Date;
    treatmentResult: string;
    currentStateDescription: string;
    validFrom: Date;
    validUntil: Date;
    valid: boolean;
    diagnosis: Diagnosis;
    count: number;
}

export interface LightHealthRecord {
    id: number;
    bloodType: string;
    rhFactor: string;
    allergies: AllergyResponse[];
    vaccinations: VaccinationResponse[];
    patientLbp: string;
}
