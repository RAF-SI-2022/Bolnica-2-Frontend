export interface HealthRecord {
    id: number;
    registrationDate:Date;
    bloodType: BloodType;
    rhFactor:RHFactor;
    allergies: Allergy[];
    vaccinations: Vaccination[];
    operations: Operation[];
    medicalHistory: MedicalHistory;
    medicalExaminations: MedicalExamination[];
    patientLbp: string;
}

export interface Allergy {
    id: number;
    allergen: Allergen;
    healthRecord: HealthRecord;
    deleted: boolean;
}

export interface Allergen {
    id: number;
    name: string;
}

export interface Vaccination {
    id: number;
    vaccine: Vaccine;
    healthRecord: HealthRecord;
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
    id: number;
    confidential: boolean;
    illnessStart: Date;
    illnessEnd: Date;
    treatmentResult: TreatmentResult;
    currentStateDescription: string;
    validFrom: Date;
    validUntil: Date;
    valid: boolean;
    diagnosis?: Diagnosis;
}

export interface LightHealthRecord {
    id: number;
    rhFactor: RHFactor[];
    allergies: Allergy[];
    vaccinations: Vaccination[];
    patientLbp: string;
}

interface BloodType {
    notation: string;
}
  
interface RHFactor {
    notation: string;
}
  
interface TreatmentResult {
   notation: string;
}