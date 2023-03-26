export interface PatientRequest {
    jmbg: string;
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
  }
  