import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ApiService } from '../services/api.service';
import { Exercise } from '../Models/exercise.dto';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
   CommonModule,
   MaterialModule
]
})
export class HomeComponent  implements OnInit {
  exercises: Exercise[] | undefined;
  constructor(private service: ApiService) { }
  ngOnInit(){


      this.service.sendGetRequest().subscribe(exercises =>{
        console.log(exercises);
        this.exercises= exercises;
      
     })
  }
}