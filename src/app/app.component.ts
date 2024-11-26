import {Component, inject, OnInit} from '@angular/core';
import { NeatConfig, NeatGradient } from "@firecms/neat";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {PredictionService} from './prediction.service';

export const config: NeatConfig = {
  "colors": [
    {
      "color": "#cdb4db",
      "enabled": true
    },
    {
      "color": "#ffc8dd",
      "enabled": true
    },
    {
      "color": "#ffafcc",
      "enabled": true
    },
    {
      "color": "#bde0fe",
      "enabled": true
    },
    {
      "color": "#a2d2ff",
      "enabled": false
    }
  ],
  "speed": 4,
  "horizontalPressure": 4,
  "verticalPressure": 6,
  "waveFrequencyX": 2,
  "waveFrequencyY": 4,
  "waveAmplitude": 6,
  "shadows": 0,
  "highlights": 4,
  "colorBrightness": 1,
  "colorSaturation": 3,
  "wireframe": false,
  "colorBlending": 5,
  "backgroundColor": "#003FFF",
  "backgroundAlpha": 1,
  "grainScale": 0,
  "grainIntensity": 0,
  "grainSpeed": 0,
  "resolution": 1
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private predictionService = inject(PredictionService);
  formGroup!: FormGroup;
  prediction:string | null = null;

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      Age: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
      SystolicBP: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
      DiastolicBP: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
      BS: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
      BodyTemp: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
      HeartRate: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
    });
    const neat = new NeatGradient({
      ref: document.getElementById("gradient")! as HTMLCanvasElement,
      ...config
    });

// you can change the config at any time
    neat.speed = 6;
  }

  filtrar(){
    if(this.formGroup.invalid)
      return;
    this.predictionService.predict(this.formGroup.value).subscribe(prediction => {this.prediction = prediction.RiskLevel})
  }
}
