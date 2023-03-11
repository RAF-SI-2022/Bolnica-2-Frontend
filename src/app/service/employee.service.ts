import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPLOYEE_ENDPOINT } from "../app.constants";
import { NewEmployeeRequest } from "../dto/request/employee.request";
import { EmployeeResponse } from "../dto/response/employee.response";

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    constructor(private httpClient: HttpClient) {

    }

    addNewEmployee(employee: NewEmployeeRequest) {
        return this.httpClient.post<EmployeeResponse>(EMPLOYEE_ENDPOINT, employee, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }
}