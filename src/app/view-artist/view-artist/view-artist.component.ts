import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  totalFans!: any;

  constructor(private service: DeezerService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.artistId = params['artistId'];
      this.artistDetails = JSON.parse(sessionStorage.getItem("artistDetails") || '');
      this.getArtistAlbums(this.artistId);
      this.artistTopCharts(this.artistId);
    })
  }

  public backToSearch() {
    sessionStorage.removeItem("artistDetails");
    this.route.navigateByUrl('/');
  }

  public getArtistAlbums(id: string) {
    this.service.artistAlbums(id).subscribe({
      next:(response: any) => {
        this.albums = response.data;
      }, error:(error: any) => {
        console.log(error);
      }
    })
  }

  public artistTopCharts(id: string) {
    this.service.topCharts(id).subscribe({
      next:(response: any) => {
        this.charts = response.data;
      }, error:(error: any) => {
        console.log(error);
      }
    })
  }

}
