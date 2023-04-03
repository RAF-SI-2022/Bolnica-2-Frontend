export interface PatientResponse {
    id: number;
    jmbg: string;
    lbp: string;
    firstName: string;
    parentName: string;
    lastName: string;
    gender: PackedString;
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
    familyStatus: PackedString;
    maritalStatus: PackedString;
    childrenNum: number;
    education: PackedString;
    profession: string;
    healthRecordId: number;
    deleted: boolean;
}

export interface SearchPatientsResponse {
    patients: PatientResponse[],
    count: number
}

interface PackedString {
    notation: string
  }