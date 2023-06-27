import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPLOYEE_ENDPOINT, USER_URL } from "../app.constants";
import { UpdateEmployeeRequest, NewEmployeeRequest } from "../dto/request/employee.request";
import { EmployeeCountResponse, EmployeeResponse, SearchEmployeesResponse } from "../dto/response/employee.response";

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
        const params: any = {};
        params.firstName = query.firstName;
        params.lastName = query.lastName;
        params.departmentName = query.departmentName;
        params.hospitalName = query.hospitalName;
        params.includeDeleted = query.includeDeleted;
        if (query.includeCovid) {
            params.covidAccess = query.includeCovid;
        }
        params.page = query.page;
        params.size = query.size;
        return this.httpClient.get<SearchEmployeesResponse>(EMPLOYEE_ENDPOINT, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: params
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

    getDepartmentsByPbb(pbb: string) {
        return this.httpClient.get(USER_URL + `/departments/${pbb}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getDoctorsByPbo(pbo: string) {
        return this.httpClient.get(USER_URL + `/users/doctors/${pbo}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    getDoctors() {
        return this.httpClient.get(USER_URL + '/users/doctors', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    updateCovidAccess(lbz: string, covidAccess: boolean) {
        return this.httpClient.put(USER_URL + `/users/update-covid-access/${lbz}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                covidAccess: covidAccess
            }
        })
    }

    getSubordinates(page: number, size: number) {
        return this.httpClient.get(USER_URL + '/users/subordinates', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            params: {
                page: page,
                size: size
            }
        })
    }

    getShiftsByLbz(lbz: string) {
        return this.httpClient.get(USER_URL + `/users/${lbz}/shifts`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    addShift(lbz: string, shiftType: string, date: string, start: string, end: string) {
        return this.httpClient.post(USER_URL + `/users/add-shift/${lbz}`, {
            shiftType: shiftType,
            date: date,
            startTime: start + ':00',
            endTime: end + ':00'
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }
}
