import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  private apiUrl = 'http://localhost:3000/api/container';
  private departments = new BehaviorSubject<any>([
    { name: 'Mail',  weightRangeMin: '0', weightRangeMax: '1' },
    { name: 'Regular', weightRangeMin: '1', weightRangeMax: '10'  },
    { name: 'Heavy',  weightRangeMin: '12', weightRangeMax: '100'  }
  ]);
  departments$ = this.departments.asObservable();

  constructor(private http: HttpClient) {}

  getContainer(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  addDepartment(newDepartment: any) {
    const updatedDepartments = [...this.departments.getValue(), newDepartment];
    this.departments.next(updatedDepartments);
  }
  removeDepartment(newDepartment: any) { 
    this.departments.next(newDepartment);
  }

}
