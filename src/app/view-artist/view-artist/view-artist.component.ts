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
  artistDetails!: any;
  albums: any;
  charts: any

  constructor(private service: DeezerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.artistId = params['artistId'];
      this.artistDetails = JSON.parse(sessionStorage.getItem("artistDetails") || '');
      console.log(this.artistDetails);
      this.getArtistAlbums(this.artistId);
      this.artistTopCharts(this.artistId);
    })
  }

  public getArtistAlbums(id: string) {
    this.service.artistAlbums(id).subscribe({
      next:(response: any) => {
        console.log(response.data); 
        this.albums = response.data;
      }, error:(error: any) => {
        console.log(error);
      }
    })
  }

  public artistTopCharts(id: string) {
    this.service.topCharts(id).subscribe({
      next:(response: any) => {
        console.log(response); 
        this.charts = response.data;
      }, error:(error: any) => {
        console.log(error);
      }
    })
  }

}
