import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { House } from '../models/house';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { DashboardHouses } from '../models/dashboard-house';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  apiUrl = "http://localhost:3000/";

  constructor(private httpClient: HttpClient) {
  }

  // getAllHouses(): Observable<ListResponseModel<House>> {
  //   return this.httpClient.get<ListResponseModel<House>>(this.apiUrl + "house"); // Array<House>
  // }
  async getAll() {
    return await lastValueFrom<House>(this.httpClient.get<House>(this.apiUrl + "house"));
  }
  getHouseById(id: number): Observable<SingleResponseModel<House>> {
    return this.httpClient.get<SingleResponseModel<House>>(this.apiUrl + "house/" + id);
  }

 async add(house: House) {
    return await lastValueFrom<any>(this.httpClient.post(this.apiUrl + "house", house));
  }

  async update(id: number, house: House) {
    return await lastValueFrom<ResponseModel>(this.httpClient.patch<ResponseModel>(this.apiUrl + "house/" + id, house));
  }

  async delete(id: number) {
    return await lastValueFrom<void>(this.httpClient.delete<void>(this.apiUrl + "house/" + id));
  }




  getHousesByColor(colorId:number):Observable<ListResponseModel<House>>{
    let newPath= this.apiUrl+"houses/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<House>>(newPath)
  }



  getHousesBySelect(brandId:number, colorId:number){
    let newPath = this.apiUrl + "houses/getbyselected?brandId=" + brandId + "&colorId=" + colorId;
    return this.httpClient
      .get<ListResponseModel<House>>(newPath);
  }
  getHouseDetail(houseId:number){
    let newPath = this.apiUrl + "houses/gethousedetail?houseId=" + houseId;
    return this.httpClient
      .get<ListResponseModel<House>>(newPath);
  }

  getAllHouseDetail(){
    let newPath = this.apiUrl + "houses/getallhousedetail"
    return this.httpClient
      .get<ListResponseModel<DashboardHouses>>(newPath);
  }
}
