import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private favouritesEndPoint;
  private restEndPoint;

  private httpOptions={
    headers : new HttpHeaders({
      'DoNotIntercept':'true'
    })
  };

  constructor(private http: HttpClient) { 
    this.restEndPoint="https://restcountries.eu/rest/v2/name";
    this.favouritesEndPoint="http://localhost:2212/api/v1/favouriteservice/country";
  }

  searchCountryByName(name:string): Observable<Array<Country>>{
    var searchEndPoint=`${this.restEndPoint}/${name}`;
    //console.log(searchEndPoint);
    return this.http.get<Array<Country>>(searchEndPoint, this.httpOptions);
  }

  searchCountryByFullName(cname:string): Observable<Country>{
    console.log("name of country: "+cname);
    var fullSearchEndPoint=`${this.restEndPoint}/${cname}?fullText=true`;
    console.log("in service "+fullSearchEndPoint);
    return this.http.get<Country>(fullSearchEndPoint, this.httpOptions);
  }

  saveCountryToFavorites(country:Country){
    console.log(JSON.stringify(country));
    return this.http.post(`${this.favouritesEndPoint}`,country, {responseType: 'text'});
  }

  getFavouriteCountries(): Observable<Array<Country>>{
    return this.http.get<Array<Country>>(`${this.favouritesEndPoint}`);
  }

  deleteFavouriteCountries(id:number){
    return this.http.delete(`${this.favouritesEndPoint}/${id}`,{responseType:'text'});
  }

  updateCountryInFavourites(country:Country):Observable<Country>{
    return this.http.put<Country>(`${this.favouritesEndPoint}`, country);
  }
}
