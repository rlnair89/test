import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentManagerComponent } from './department-manager.component';
import { ContainerService } from '../container.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DepartmentManagerComponent', () => {
  let component: DepartmentManagerComponent;
  let fixture: ComponentFixture<DepartmentManagerComponent>;
  let mockContainerService: jasmine.SpyObj<ContainerService>;

  beforeEach(async () => {
    mockContainerService = jasmine.createSpyObj('ContainerService', [
      'addDepartment',
      'removeDepartment'
    ]);

    await TestBed.configureTestingModule({
      declarations: [DepartmentManagerComponent],
      imports: [MatTableModule, FormsModule, MatToolbarModule, MatTableModule,MatTabsModule,MatInputModule,MatButtonModule,
        MatIconModule, MatFormFieldModule, MatSelectModule, MatMenuModule, MatCardModule, MatDividerModule,
      BrowserAnimationsModule],
      providers: [
        { provide: ContainerService, useValue: mockContainerService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentManagerComponent);
    component = fixture.componentInstance;

    // Mock departments$ observable with an example list of departments
    mockContainerService.departments$ = of([
      { name: 'Department 1', weightRangeMin: '10', weightRangeMax: '20' },
      { name: 'Department 2', weightRangeMin: '15', weightRangeMax: '25' }
    ]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize departments and dataSource on ngOnInit', () => {
    expect(component.departments).toEqual([
      { name: 'Department 1', weightRangeMin: '10', weightRangeMax: '20' },
      { name: 'Department 2', weightRangeMin: '15', weightRangeMax: '25' }
    ]);
    expect(component.dataSource).toEqual(component.departments);
  });

  it('should add a new department when addDepartment is called with valid data', () => {
    // Arrange: Set up `newDepartment` with specific values for the test
    component.newDepartment = { name: 'Department 3', weightRangeMin: '20', weightRangeMax: '30' };
    
    // Act: Call addDepartment to trigger the service method
    component.addDepartment();
  
    // Assert: Verify that the service method was called with the correct data
    expect(mockContainerService.addDepartment).toHaveBeenCalledWith({
      name: 'Department 3',
      weightRangeMin: '20',
      weightRangeMax: '30'
    });
  });
  
  it('should not add a department if fields are empty', () => {
    component.newDepartment = { name: '', weightRangeMin: '', weightRangeMax: '' };
    component.addDepartment();
    expect(mockContainerService.addDepartment).not.toHaveBeenCalled();
    expect(component.dataSource.length).toBe(2); // Still 2 as it was initially
  });

  it('should remove a department and update dataSource', () => {
    const departmentToRemove = component.departments[0];
    mockContainerService.removeDepartment.and.callFake((departments) => {
      component.departments = departments;
    });

    component.removeDepartment(departmentToRemove);
    expect(mockContainerService.removeDepartment).toHaveBeenCalled();
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource).not.toContain(departmentToRemove);
  });
});
