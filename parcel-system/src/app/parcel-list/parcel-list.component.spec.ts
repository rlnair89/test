import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ParcelListComponent } from './parcel-list.component';
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
import { ContainerService } from './../container.service';
import { FormsModule } from '@angular/forms';

describe('ParcelListComponent', () => {
  let component: ParcelListComponent;
  let fixture: ComponentFixture<ParcelListComponent>;
  let mockContainerService: jasmine.SpyObj<ContainerService>;

  beforeEach(async () => {
    mockContainerService = jasmine.createSpyObj('ContainerService', ['departments$', 'getContainer']);
    await TestBed.configureTestingModule({
      declarations: [ParcelListComponent],
      imports: [MatTableModule, FormsModule, MatToolbarModule, MatTableModule,MatTabsModule,MatInputModule,MatButtonModule,
        MatIconModule, MatFormFieldModule, MatSelectModule, MatMenuModule, MatCardModule, MatDividerModule,
      BrowserAnimationsModule],
      providers: [{ provide: ContainerService, useValue: mockContainerService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call fetchContainerData', () => {
      spyOn(component, 'fetchContainerData');
      component.ngOnInit();
      expect(component.fetchContainerData).toHaveBeenCalled();
    });
  });

  describe('findCategory', () => {
    it('should return the correct category for a given weight', () => {
      const categoriesMock = [
        { name: 'Light', weightRangeMin: '0', weightRangeMax: '10' },
        { name: 'Medium', weightRangeMin: '11', weightRangeMax: '20' },
        { name: 'Heavy', weightRangeMin: '21', weightRangeMax: '30' }
      ];

      const result = component.findCategory(15, categoriesMock);
      expect(result).toEqual({ name: 'Medium', weightRangeMin: '11', weightRangeMax: '20' });
    });

    it('should return undefined if no matching category is found', () => {
      const categoriesMock = [
        { name: 'Light', weightRangeMin: '0', weightRangeMax: '10' },
        { name: 'Medium', weightRangeMin: '11', weightRangeMax: '20' }
      ];

      const result = component.findCategory(25, categoriesMock);
      expect(result).toBeUndefined();
    });
  });
});
