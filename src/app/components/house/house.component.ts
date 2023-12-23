import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HouseService} from 'src/app/services/house.service';
import {House} from "../../models/house";
import {PriceService} from 'src/app/services/price.service';
import {Price} from 'src/app/models/price';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  allHouses: House[] = [];
  houses: House[] = [];
  dataLoaded = false
  searchPanelFilter: string = "";
  bedroomFilter: number = 0;
  priceFilter: Price = {
    "id": 0,
    "title": "All Prices",
    "from": 0,
    "to": 1000
  };
  isLoading: boolean = false;

  constructor(
    private houseService: HouseService
  ) {
  }

  onBedroomClick(id: number) {
    this.isLoading = true;
    window.setTimeout(() => {
      this.bedroomFilter = id;
      if (id != 0 && this.priceFilter.id == 0) {
        this.houses = this.allHouses.filter((x: House) => x.bedrooms == id
        &&
          (x.code.toString().includes(this.searchPanelFilter) ||
            x.description.toString().includes(this.searchPanelFilter) ||
            x.size.toString().includes(this.searchPanelFilter) ||
            x.bedrooms.toString().includes(this.searchPanelFilter) ||
            x.bathrooms.toString().includes(this.searchPanelFilter) ||
            x.price.toString().includes(this.searchPanelFilter)));
      } else if (id != 0 && this.priceFilter.id != 0) {
        this.houses = this.allHouses.filter((x: House) => x.bedrooms == id
          &&
          x.price > this.priceFilter.from && x.price < this.priceFilter.to
          &&
          (x.code.toString().includes(this.searchPanelFilter) ||
            x.description.toString().includes(this.searchPanelFilter) ||
            x.size.toString().includes(this.searchPanelFilter) ||
            x.bedrooms.toString().includes(this.searchPanelFilter) ||
            x.bathrooms.toString().includes(this.searchPanelFilter) ||
            x.price.toString().includes(this.searchPanelFilter)));
      } else if (id == 0 && this.priceFilter.id != 0) {
        this.houses = this.allHouses.filter((x: House) => x.price > this.priceFilter.from && x.price < this.priceFilter.to
          &&
          (x.code.toString().includes(this.searchPanelFilter) ||
            x.description.toString().includes(this.searchPanelFilter) ||
            x.size.toString().includes(this.searchPanelFilter) ||
            x.bedrooms.toString().includes(this.searchPanelFilter) ||
            x.bathrooms.toString().includes(this.searchPanelFilter) ||
            x.price.toString().includes(this.searchPanelFilter)));
      } else {
        this.houses = this.allHouses.filter(x=> x.code.toString().includes(this.searchPanelFilter) ||
          x.description.toString().includes(this.searchPanelFilter) ||
          x.size.toString().includes(this.searchPanelFilter) ||
          x.bedrooms.toString().includes(this.searchPanelFilter) ||
          x.bathrooms.toString().includes(this.searchPanelFilter) ||
          x.price.toString().includes(this.searchPanelFilter));
      }
      this.isLoading = false;
    }, 900);
  }

  onPriceClick(price: Price) {
    this.isLoading = true;
    window.setTimeout(() => {
      this.priceFilter = price;
      if (price.id != 0 && this.bedroomFilter == 0) {
        this.houses = this.allHouses.filter((x: House) => x.price > price.from && x.price < price.to
        && (x.code.toString().includes(this.searchPanelFilter) ||
            x.description.toString().includes(this.searchPanelFilter) ||
            x.size.toString().includes(this.searchPanelFilter) ||
            x.bedrooms.toString().includes(this.searchPanelFilter) ||
            x.bathrooms.toString().includes(this.searchPanelFilter) ||
            x.price.toString().includes(this.searchPanelFilter)));
      } else if (price.id != 0 && this.bedroomFilter != 0) {
        this.houses = this.allHouses.filter((x: House) => x.bedrooms == this.bedroomFilter
          && x.price > this.priceFilter.from && x.price < this.priceFilter.to
          &&  (x.code.toString().includes(this.searchPanelFilter) ||
            x.description.toString().includes(this.searchPanelFilter) ||
            x.size.toString().includes(this.searchPanelFilter) ||
            x.bedrooms.toString().includes(this.searchPanelFilter) ||
            x.bathrooms.toString().includes(this.searchPanelFilter) ||
            x.price.toString().includes(this.searchPanelFilter)));
      } else if (price.id == 0 && this.bedroomFilter != 0) {
        this.houses = this.allHouses.filter((x: House) => x.bedrooms == this.bedroomFilter
          && (x.code.toString().includes(this.searchPanelFilter) ||
          x.description.toString().includes(this.searchPanelFilter) ||
          x.size.toString().includes(this.searchPanelFilter) ||
          x.bedrooms.toString().includes(this.searchPanelFilter) ||
          x.bathrooms.toString().includes(this.searchPanelFilter) ||
          x.price.toString().includes(this.searchPanelFilter)));
      } else {
        this.houses = this.allHouses.filter(x=> x.code.toString().includes(this.searchPanelFilter) ||
          x.description.toString().includes(this.searchPanelFilter) ||
          x.size.toString().includes(this.searchPanelFilter) ||
          x.bedrooms.toString().includes(this.searchPanelFilter) ||
          x.bathrooms.toString().includes(this.searchPanelFilter) ||
          x.price.toString().includes(this.searchPanelFilter));
      }
      this.isLoading = false;
    }, 900);
  }

  searchPanelFilterChange(value: string) {
    this.isLoading = true;
    window.setTimeout(() => {
      if (this.bedroomFilter != 0 && this.priceFilter.id == 0) {
        this.houses = this.allHouses.filter((x: House) =>
          (x.code.toString().includes(value) ||
            x.description.toString().includes(value) ||
            x.size.toString().includes(value) ||
            x.bedrooms.toString().includes(value) ||
            x.bathrooms.toString().includes(value) ||
            x.price.toString().includes(value))
          && x.bedrooms == this.bedroomFilter);
      } else if (this.bedroomFilter != 0 && this.priceFilter.id != 0) {
        this.houses = this.allHouses.filter((x: House) =>
          (x.code.toString().includes(value) ||
            x.description.toString().includes(value) ||
            x.size.toString().includes(value) ||
            x.bedrooms.toString().includes(value) ||
            x.bathrooms.toString().includes(value) ||
            x.price.toString().includes(value))
          && x.bedrooms == this.bedroomFilter
          && x.price > this.priceFilter.from && x.price < this.priceFilter.to);
      } else if (this.bedroomFilter == 0 && this.priceFilter.id != 0) {
        this.houses = this.allHouses.filter((x: House) =>
          (x.code.toString().includes(value) ||
            x.description.toString().includes(value) ||
            x.size.toString().includes(value) ||
            x.bedrooms.toString().includes(value) ||
            x.bathrooms.toString().includes(value) ||
            x.price.toString().includes(value))
          && x.price > this.priceFilter.from && x.price < this.priceFilter.to);
      } else {
        this.houses = this.allHouses.filter((x: House) =>
          x.code.toString().includes(value) ||
          x.description.toString().includes(value) ||
          x.size.toString().includes(value) ||
          x.bedrooms.toString().includes(value) ||
          x.bathrooms.toString().includes(value) ||
          x.price.toString().includes(value));
      }

      this.isLoading = false;
    }, 900);
  }

  ngOnInit(): void {
    this.houseService.getAllHouses().subscribe(res => {
      this.allHouses = res as any
      this.houses = res as any
      this.dataLoaded = true;
    })

  }


  // getCarsByBrand(brandId:number){
  //   this.houseService.getHousesByBrand(brandId).subscribe(response=>{
  //     this.houses=response.data;
  //     this.dataLoaded=true;
  //   })
  // }


  // getHousesByBedrooms(bedroomId: number){
  //    this.houses  =  this.houseService.getHousesByBedrooms(bedroomId);
  //     this.dataLoaded=true;
  // }


  // getCarsBySelect(brandId:number, colorId:number){
  //   this.houseService.getHousesBySelect(brandId,colorId).subscribe(response=>{
  //     this.houses=response.data
  //     this.dataLoaded=true;
  //   })
  // }

}
