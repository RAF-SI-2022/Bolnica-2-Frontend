import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwt_decode,{ JwtPayload } from "jwt-decode";
import { EMPLOYEE_ENDPOINT } from "../app.constants";
import { NewEmployeeRequest } from "../dto/request/employee.request";
import { UpdateEmployeeRequest } from "../dto/request/update.employee.request";
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

   /* updateEmployee(employee: UpdateEmployeeRequest) {

        const token=localStorage.getItem('token');
        if(token==null)
            return;
    
        let lbz="";
        try{
        let decodedHeader = jwt_decode<JwtPayload>(token);
            if(decodedHeader.sub==null)
                return;
            else
                lbz=decodedHeader.sub;
        }
        catch{}
    
        return this.httpClient.put<EmployeeResponse>(EMPLOYEE_ENDPOINT+'/'+lbz, employee, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        }*/

}
