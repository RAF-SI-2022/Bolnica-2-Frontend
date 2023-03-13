import { DepartmentResponse } from "./department.response";

export interface EmployeeResponse {
    id: number,
    lbz: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: string,
    residentalAddress: string,
    placeOfLiving: string,
    phone: string,
    email: string,
    title: Title,
    profession: Profession,
    username: string,
    department: DepartmentResponse,
    permissions: string[],
    jmbg: string,
    deleted: boolean
}

export interface SearchEmployeesResponseV2 {
    userList: SearchEmployeeResponse[],
    count: number
}

export interface SearchEmployeeResponse {
    id: number,
    lbz: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    title: Title,
    profession: Profession,
    phone: string,
    email: string,
    departmentName: string,
    hospitalName: string
}

interface Title {
    notation: string
}

interface Profession {
    notation: string
}

export interface EmployeeCountResponse {
    count: number
}
