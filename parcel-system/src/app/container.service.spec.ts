import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContainerService } from './container.service';

describe('ContainerService', () => {
  let service: ContainerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContainerService]
    });
    service = TestBed.inject(ContainerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize departments$ with default departments', (done) => {
    service.departments$.subscribe(departments => {
      expect(departments).toEqual([
        { name: 'Mail', weightRangeMin: '0', weightRangeMax: '1' },
        { name: 'Regular', weightRangeMin: '1', weightRangeMax: '10' },
        { name: 'Heavy', weightRangeMin: '12', weightRangeMax: '100' }
      ]);
      done();
    });
  });

  it('should make an HTTP GET request in getContainer', () => {
    const mockContainerData = { Container: { parcels: [] } };

    service.getContainer().subscribe(data => {
      expect(data).toEqual(mockContainerData);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/container');
    expect(req.request.method).toBe('GET');
    req.flush(mockContainerData);
  });

  it('should add a new department when addDepartment is called', (done) => {
    const newDepartment = { name: 'Light', weightRangeMin: '5', weightRangeMax: '15' };

    service.addDepartment(newDepartment);

    service.departments$.subscribe(departments => {
      expect(departments).toContain(newDepartment);
      expect(departments.length).toBe(4); // Initial 3 + 1 new
      done();
    });
  });

  it('should update departments when removeDepartment is called', (done) => {
    const updatedDepartments = [
      { name: 'Mail', weightRangeMin: '0', weightRangeMax: '1' }
    ];

    service.removeDepartment(updatedDepartments);

    service.departments$.subscribe(departments => {
      expect(departments).toEqual(updatedDepartments);
      done();
    });
  });
});
