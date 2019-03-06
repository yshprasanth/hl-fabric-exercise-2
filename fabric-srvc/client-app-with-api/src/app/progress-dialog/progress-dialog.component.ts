import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.css']
})
export class ProgressDialogComponent implements OnInit {

  lcolor = "primary";
  lmode = "indeterminate";
  lvalue = 100;
  
  constructor(public dialogRef: MatDialogRef<ProgressDialogComponent>) {
   }

  ngOnInit() {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
