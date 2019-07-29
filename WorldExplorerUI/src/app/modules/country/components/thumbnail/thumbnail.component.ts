import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Country } from '../../country';
import { Router } from '@angular/router';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { MatDialog } from '@angular/material';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
import { CountryService } from '../../country.service';

@Component({
  selector: 'fav-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent implements OnInit {

  @Input()
  country:Country;

  @Input()
  isFavourite:boolean;

  @Output() added = new EventEmitter();

  @Output() deleted = new EventEmitter();

  constructor(private router:Router,public dialog:MatDialog) {
    this.country=new Country();
   }

  ngOnInit() {

  }

  viewCountry(actionType){
    // this.router.navigate(['/countries/viewcountry',this.country.name]);
    let dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '600px',
      data: {obj : this.country, actionType:actionType}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addToFavourites(){
    this.added.emit(this.country);
  }

  deleteFromFavourites(){
    this.deleted.emit(this.country);
  }

  updateWatchList(actionType){

    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      data: {obj : this.country, actionType:actionType}
    });

    console.log("open dialog");
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog is closed now");
    });
   
    //this.updated.emit(this.movie);  
  }
}
