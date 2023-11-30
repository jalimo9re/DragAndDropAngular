import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Exercise } from '../Models/exercise.dto';
import { ApiService } from '../services/api.service';
import { MaterialModule } from '../material.module';
import { DialogAddComponent } from '../dialog/dialogAdd.component';
import { DialogData } from '../Models/dialogData.dto';
@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
  imports: [
    AngularSplitModule,
    DragDropModule,
    CommonModule,
    CdkDrag,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  standalone: true,
})
export class DragComponent implements OnInit {
  exercises = new Array<Exercise>();
  exercisesSel = new Array<Exercise>();
  LIST_IDS = new Array();
  iniciado: boolean = false;
  constructor(private service: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.service.sendGetRequest().subscribe((exercises) => {
      console.log(exercises);
      this.exercises = exercises;
    });
    let dummy: Exercise = {
      description: 'Arrastar aqui',
      icon: '',
      duration: 0,
      id: 0,
      name: 'Arrastar aqui',
    };

    this.exercisesSel.push(dummy);
    this.addId('01');
  }
  addId(id: string) {
    this.LIST_IDS.push('cdk-drop-list-' + id);
  }
  remove(item: Exercise) {
    this.exercisesSel.splice(item.order!, 1);
    this.refreshOrder();
  }
  refreshOrder() {
    var k = 0;
    this.exercisesSel.forEach((element) => {
      element['order'] = k++;
    });
  }

  drop(event: CdkDragDrop<Array<Exercise>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let previousIndex = event.previousIndex;
      const element = event.previousContainer.element.nativeElement;
      const id = element.getAttribute('id');
      if (!this.iniciado) {
        // para borrar el dummy de arrastrar
        this.iniciado = true;
        this.exercisesSel.shift();
        event.currentIndex = 0;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        previousIndex,
        event.currentIndex
      );
      let exercise = event.container.data[event.currentIndex];
      this.service.sendGetRequest().subscribe((exercises) => {
        this.exercises = exercises;
      });
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        name: exercise.name,
        duration: exercise.duration,
      };
      const dialogRef = this.dialog.open(DialogAddComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {
        exercise.duration = data.duration;
      });
    }
    this.refreshOrder();
  }
}
