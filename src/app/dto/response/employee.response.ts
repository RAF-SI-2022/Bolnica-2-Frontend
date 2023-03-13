import { DepartmentResponse } from "./department.response";
import { ProfessionResponse } from "./profession.response";
import { TitleResponse } from "./title.response";

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
    title: TitleResponse,
    profession: ProfessionResponse,
    username: string,
    department: DepartmentResponse,
    permissions: string[],
    jmbg: string,
    deleted: boolean
}
