import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeezerService } from 'src/app/services/DeezerService.component';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.scss']
})
export class ViewArtistComponent implements OnInit {

  routeSub!: Subscription;
  artistId!: string;
  artistDetails!: string;

  constructor(private service: DeezerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.artistId = params['artistId'];
      this.artistDetails = JSON.parse(sessionStorage.getItem("artistDetails") || '');
      console.log(this.artistId);
      console.log(this.artistDetails);
      this.getArtistAlbums();
      this.artistTopCharts();
    })
  }

  public getArtistAlbums() {
    this.service.artistAlbums(this.artistId).subscribe({
      next:(response: any) => {
        console.log(response); 
      }, error:(error: any) => {
        console.log(error);
      }
    })
  }

  public artistTopCharts() {
    this.service.topCharts(this.artistId).subscribe({
      next:(response: any) => {
        console.log(response); 
      }, error:(error: any) => {
        console.log(error);
      }
    })
  }

}
