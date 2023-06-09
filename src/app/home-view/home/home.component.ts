import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  }

  public searchArtist(searchString: string) {
    this.service.localSearchArtist(searchString, 4, 0).subscribe({
      next:(response: any) => {
        this.searchResults = true;
        this.artistDetails = response.data;       
      }, error:(error) => {
        
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
