import { Component, OnInit } from '@angular/core';
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

  constructor(private service: DeezerService) { }

  ngOnInit(): void {
    console.log(
      this.service.localSearchArtist(this.artistName, 3, 0)
      .subscribe({
        next:(response: any) => {
          this.artistDetails = response.data;
          console.log(this.artistDetails);          
        }, error:() => {

        }, complete:() => {}
      }));
  }

  public viewDetails(artistId: any): void {
    console.log(artistId);
    this.service.numberOfFans(artistId).subscribe({
      next:(response: any) => {
        console.log(response);
      }, error:(error) => {
        console.log(error);
      },  
      complete:() => {}
    })
  }

}
