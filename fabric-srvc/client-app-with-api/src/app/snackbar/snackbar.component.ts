import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  lcolor = "primary";
  lmode = "indeterminate";
  lvalue = 100;
  showSpinner = true;

  constructor() { }

  ngOnInit() {
  }

}
