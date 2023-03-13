import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPLOYEE_ENDPOINT } from "../app.constants";
import { UpdateEmployeeRequest, NewEmployeeRequest } from "../dto/request/employee.request";
import { EmployeeCountResponse, EmployeeResponse, SearchEmployeeResponse, SearchEmployeesResponseV2 } from "../dto/response/employee.response";

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

    searchEmployees(query: any) {
        return this.httpClient.get<SearchEmployeesResponseV2>(EMPLOYEE_ENDPOINT, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                firstName: query.firstName,
                lastName: query.lastName,
                departmentName: query.departmentName,
                hospitalName: query.hospitalName,
                includeDeleted: query.includeDeleted,
                page: query.page,
                size: query.size
            }
        });
    }

    getEmployeeByLbz(lbz: string) {
        return this.httpClient.get<EmployeeResponse>(EMPLOYEE_ENDPOINT + `/${lbz}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    deleteEmployee(id: number) {
        return this.httpClient.delete<EmployeeResponse>(EMPLOYEE_ENDPOINT + `/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
    }

    updateEmployee(lbz: string, updateEmployeeRequest: UpdateEmployeeRequest) {
        return this.httpClient.put<EmployeeResponse>(EMPLOYEE_ENDPOINT + `/${lbz}`, updateEmployeeRequest, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}