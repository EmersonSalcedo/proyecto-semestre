import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface predictionResponse {
  RiskLevel: string;
}

export interface predictionRequest {
  Age: number,
  SystolicBP: number,
  DiastolicBP: number,
  BS: number,
  BodyTemp: number,
  HeartRate: number
}


@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private _http = inject(HttpClient);

  predict(values: predictionRequest): Observable<predictionResponse> {
    console.log(values);
    return this._http.post<predictionResponse>('https://prediccion-riesgo-f01fcc0150ed.herokuapp.com/predict', values);
  }

}
