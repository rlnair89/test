import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ContainerService } from '../container.service';


@Component({
  selector: 'app-department-manager',
  templateUrl: './department-manager.component.html',
  styleUrls: ['./department-manager.component.scss']
})
export class DepartmentManagerComponent implements OnInit {
  departments: any;
  newDepartment: any = { name: '', weightRangeMin: '', weightRangeMax: '' };
  displayedColumns: string[] = ['name', 'weightRangemin', 'weightRangemax', 'remove'];
  dataSource : any;
  constructor(private departmentService: ContainerService) {}
  ngOnInit(): void {
    console.log(this.dataSource);
    this.departmentService.departments$.subscribe((departments) => {
      this.departments = departments;
    });
    this.dataSource = [...this.departments];
    }
  addDepartment() {
        if (this.newDepartment.name && this.newDepartment.weightRangeMin && this.newDepartment.weightRangeMax) {
          this.departmentService.addDepartment(this.newDepartment); 
          this.dataSource = [...this.departments];
          this.newDepartment = { name: '', weightRangeMin: '', weightRangeMax: '' };
        }
      }
  removeDepartment(department: any) {
    this.departments = this.departments.filter((dep: any) => dep !== department);
    this.dataSource = [...this.departments]; // Update data source
    this.departmentService.removeDepartment(this.departments); 
  }
}
