import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CombService {

  constructor() { }
  public combinedSummary:string[]=[];
}
