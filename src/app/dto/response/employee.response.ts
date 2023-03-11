import { DepartmentResponse } from "./department.response";

export interface EmployeeResponse {
    id: number,
    lbz: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    residentialAddress: string,
    placeOfLiving: string,
    phone: string,
    email: string,
    title: string,
    profession: string,
    username: string,
    department: DepartmentResponse,
    permissions: string[],
    jmbg: string,
    deleted: boolean
}
