import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef , MAT_DIALOG_DATA} from '@angular/material';
import { CountryService } from '../../country.service';
import { Country } from '../../country';

@Component({
  selector: 'fav-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent implements OnInit {

  country:Country;
  comments: string;
  actionType : string;
  constructor( public snackBar : MatSnackBar, 
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
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

  updateComments(){
    this.country.comments=this.comments;
    this.dialogRef.close();
    this.countryService.updateCountryInFavourites(this.country).subscribe(
      (movie)=>{
        this.snackBar.open(`Updated ${this.country.name} Successfully`,'',{
          duration :1000
        })
      }
    );
  }
}
