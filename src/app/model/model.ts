export interface Artist {
    artistCover: string;
    artistName: string;
    numOfFans: number;
}

export interface APIResponse<T> {
    results: Array<T>
}