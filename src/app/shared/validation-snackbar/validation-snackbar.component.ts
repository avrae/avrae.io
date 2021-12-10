import { Component } from "@angular/core";
import { MatSnackBar, MAT_SNACK_BAR_DATA, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { Inject } from '@angular/core';  


@Component({
  selector: 'validation-snackbar',
  templateUrl: 'validation-snackbar.component.html',
  styleUrls: ['./validation-snackbar.component.css']
})

export class ValidationSnackbar { 
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              public snackBar: MatSnackBar) {
  }
}
