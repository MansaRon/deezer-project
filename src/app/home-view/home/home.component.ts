import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse, Artist } from 'src/app/model/model';
import { DeezerService } from 'src/app/services/DeezerService.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artistName!: string;
  numOfFans!: string;
  artistThumbNail!: ImageBitmap;
  artistDetails: any;
  searchResults: boolean = false;

  constructor(private service: DeezerService, private route: Router) { }

  ngOnInit(): void {
    // this.searchArtist();
  }

  public searchArtist(searchString: string) {
    this.service.localSearchArtist(searchString, 3, 0).subscribe({
      next:(response: any) => {
        this.searchResults = true;
        this.artistDetails = response.data;       
      }, error:() => {
        
      }, complete:() => {}
    })
  }

  public checkChange() {
    this.service.localSearchArtist(this.artistName, 3, 0).subscribe({
      next:(response: any) => {
        this.artistDetails = response.data;       
      }, error:() => {

      }, complete:() => {}
    })
  }

  public viewDetails(artistId: any): void {
    this.route.navigate(['view-artist', artistId]);
    this.service.numberOfFans(artistId).subscribe({
      next:(response: any) => {
        sessionStorage.setItem("artistDetails", JSON.stringify(response));
      }, error:(error) => {
        console.log(error);
      },  
      complete:() => {}
    })
  }

}
