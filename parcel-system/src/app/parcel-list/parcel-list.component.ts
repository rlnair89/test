import { ContainerService } from './../container.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.scss']
})
export class ParcelListComponent  implements OnInit{
  container: any;
  parcelData: any;
  departments: any;
  mainData: any;
  displayedColumns: string[] = ['recipient', 'address', 'weight', 'price', 'department'];

  constructor(private containerService: ContainerService) {}

  ngOnInit(): void {
    this.fetchContainerData();
  }

  fetchContainerData(): void {
    this.containerService.departments$.subscribe((departments) => {
    this.departments = departments;
    });
    this.containerService.getContainer().subscribe(data => {
      this.container = data.Container.parcels;
      const result = [
        { name: "Other", data: [] },
        { name: "Insurance", data: [] },
        ...this.departments.map((category: any) => ({ name: category.name, data: [] }))
    ];

    
    this.container.Parcel.forEach((item: any) => {
        const weight = parseFloat(item.Weight);
        const value = parseFloat(item.Value);
        
        if (value >= 1000) {
            result.find(category => category.name === "Insurance").data.push({
                name: "Insurance",
                weightRangeMin: "",
                weightRangeMax: "",
                ...item
            });
        } else {
            // Find the weight category
            const matchedCategory = this.findCategory(weight, this.departments);
            
            if (matchedCategory) {
                result.find(category => category.name === matchedCategory.name).data.push({
                    name: matchedCategory.name,
                    weightRangeMin: matchedCategory.weightRangeMin,
                    weightRangeMax: matchedCategory.weightRangeMax,
                    ...item
                });
            } else {
                // If no weight range match, add to "Other" category
                result.find(category => category.name === "Other").data.push({
                    name: "Other",
                    weightRangeMin: "",
                    weightRangeMax: "",
                    ...item
                });
            }
        }
    });
    this.mainData = result;
   });
  }
  findCategory(weight: any, categories: any) {
      return categories.find((category: any) => {
          return weight >= parseFloat(category.weightRangeMin) && weight <= parseFloat(category.weightRangeMax);
      });
  }
}

