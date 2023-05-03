import { Component } from '@angular/core';
import { DeezerService } from './services/DeezerService.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'musicdb-app-angular';

  constructor(private service: DeezerService) {
    console.log(
      this.service.localSearchArtist('Bruno Mars', 3, 0)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      }));
  }
}
