import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DeezerService {
    private api = '/api/artist';

    constructor(private http: HttpClient) {}

    searchArtist(query: string, limit = 10, offset = 0) {
        let params = {
            q: query,
            limit: limit.toString(),
            offset: offset.toString()
        };

        return this.http.get(this.api, { params });
    }

    localSearchArtist(query: string, limit = 10, offset = 0) {
        let params = {
            q: query,
            limit: limit.toString(),
            offset: offset.toString()
        };

        return this.http.get('https://api.deezer.com/search', { params });
    }

    numberOfFans(artistId: string) {
        return this.http.get(`https://api.deezer.com/artist/${artistId}`);
    }

    topCharts(artistId: string) {
        return this.http.get(`https://api.deezer.com/artist/${artistId}/top?limit=5`);
    }

    artistAlbums(artistId: string) {
        return this.http.get(`https://api.deezer.com/artist/${artistId}/albums?limit=4`);
    }
}