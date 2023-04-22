export interface HospitalResponse {
    id: number,
    pbb: string,
    fullName: string,
    shortName: string,
    place: string,
    address: string,
    dateOfEstablishment: string,
    activity: string,
    deleted: boolean
}

export interface HospitalsByDepartmentResponse {
    pbo: string,
    name: string,
    hospitalResponse: HospitalResponse
}