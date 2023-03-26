export interface PatientResponse {
    id: number;
    jmbg: string;
    lbp: string;
    firstName: string;
    parentName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    deathDate: Date;
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
    deleted: boolean;
    healthRecord: HealthRecord;
}

export interface SearchPatientsResponse {
    userList: SearchedPatient[],
    count: number

}
export interface SearchedPatient {
    id: number;
    jmbg: string;
    lbp: string;
    firstName: string;
    parentName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    deathDate: Date;
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
    healthRecord: HealthRecord;
}
  
export interface HealthRecord {
    id: number;
    registrationDate:Date;
    bloodType: BloodType;
    rhFactor:RHFactor;
    deleted:boolean; 
    allergies: Allergy[];
    vaccinations: Vaccination[];
    operations: Operation[];
    medicalExaminations: MedicalExamination[];
    medicalHistory: MedicalHistory;
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
    allergies: Allergy[];
}

export interface Vaccination {
    id: number;
    vaccine: Vaccine;
    healthRecord: HealthRecord;
    vaccinationDate: Date;
    deleted: boolean;
}

export interface Vaccine {
    id: number;
    name: string;
    type: string;
    description: string;
    vaccinations: Vaccination[];
}

export interface Operation {
    id: number;
    date: Date;
    description: string;
    deleted: boolean;
    pbo: string;
    healthRecord: HealthRecord;
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
    deleted: boolean;
    lbz: string;
    diagnosis: Diagnosis;
    healthRecord: HealthRecord;
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
    illnessEnd?: Date;
    treatmentResult: TreatmentResult;
    currentStateDescription: string;
    validFrom: Date;
    validUntil: Date;
    valid?: boolean;
    diagnosis?: Diagnosis;
    healthRecord: HealthRecord;
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