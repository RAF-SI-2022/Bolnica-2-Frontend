import { HospitalResponse } from "./hospital.response";

export interface DepartmentResponse {
    id: number,
    pbo: string,
    name: string,
    hospital: HospitalResponse,
    deleted: boolean
}
