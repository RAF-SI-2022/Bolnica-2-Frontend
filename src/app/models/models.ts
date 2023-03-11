export interface User{
    id: number,
    lbz: number,
    firstName:string,
    lastName: string ,
    dateOfBirth:Date,
    gender:string,
    JMBG:string,
    residentialAddress:string,
    placeOfLiving:string,
    phone:string,
    email:string,
    title:Title,
    profession:Profession,
    username:string,
    password:string,
    isDeleted:boolean,
    department:Department,
    permissions:Permission,
}

export interface Permission{
    name:string
}

export interface Department{
    id:number,
    pbo:number,
    name: string,
    hospital: Hospital,
    isDeleted :boolean,
}

export interface Hospital{

    id:number,
    pbb:number,
    fullName:string,
    shortName:string,
    place:string,
    address:string,
    dateOfEstablishment:Date,
    activity:string,
    isDeleted:boolean,
}

export enum Title{
    PROF_DR_MED = "Prof. dr. med.",
    DR_MED_SPEC = "Dr med. spec.",
    DR_SCI_MED = "Dr sci. med.",
    DIPL_FARM = "Dipl. farm.",
    MAG_FARM = "Mag. farm.",
    MR="Mr",
}

export enum Profession{
    MED_SESTRA = "Med. sestra",
    SPEC_BIOHEMICAR = "Spec. biohemičar",
    SPEC_GASTROENTEROLOG = "Spec. gastroenterolog",
    SPEC_GINEKOLOG = "Spec. ginekolog",
    SPEC_ENDOKRINOLOG = "Spec. endokrinolog",
    SPEC_KARDIOLOG = "Spec. kardiolog",
    SPEC_NEUROLOG = "Spec. neurolog",
    SPEC_NEFROLOG = "Spec. nefrolog",
    SPEC_PSIHIJATAR = "Spec. psihijatar",
    SPEC_PULMOLOG = "Spec. pulmolog",
    SPEC_UROLOG = "Spec. urolog",
    SPEC_HEMATOLOG = "Spec. hematolog",
    SPEC_HIRURG = "Spec. hirurg"
}