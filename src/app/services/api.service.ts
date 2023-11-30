import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Exercise } from '../Models/exercise.dto';
@Injectable({
providedIn: 'root'
})
export class ApiService {
  private SERVER_URL = "http://localhost:3000/exercises";
  constructor(private httpClient: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
    // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
    } else {
    // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  public sendGetRequest() : Observable<Exercise[]>{
    return this.httpClient.get<Exercise[]>(this.SERVER_URL);
  }
}