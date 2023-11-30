import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Exercise } from '../Models/exercise.dto';
import { DialogData } from '../Models/dialogData.dto';
@Component({
  selector: 'dialog-add',
  templateUrl: 'dialogAdd.html',
})
export class DialogAddComponent {
  result!: Exercise;
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  /*openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddComponent, {
      data: this.result, //{ name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((_result) => {
      console.log('The dialog was closed');
      this.result = _result;
    });
  }*/
}
