import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployees(){
    return this.http.get<any>("https://localhost:7101/api/Employee/GetAllEmployees");
  }

}
