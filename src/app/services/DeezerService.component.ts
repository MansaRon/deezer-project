import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DeezerService {
    private api = '/api/artist';
    private localApi = 'https://api.deezer.com/search';

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

        return this.http.get(this.localApi, { params });
    }

    numberOfFans(artistId: string) {
        let params = {
            id: artistId
        };

        return this.http.get('https://api.deezer.com/artist', { params });
    }
}