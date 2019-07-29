import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Country } from '../../country';
import { CountryService } from '../../country.service';

@Component({
  selector: 'fav-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css']
})
export class ViewDialogComponent implements OnInit {

  country:Country;
  comments: string;
  actionType : string;
  constructor( public snackBar : MatSnackBar, 
    public dialogRef: MatDialogRef<ViewDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data : any,
  private countryService : CountryService
  ) { 
    this.comments=data.obj.comments;
    this.country=data.obj;
    this.actionType=data.actionType;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
