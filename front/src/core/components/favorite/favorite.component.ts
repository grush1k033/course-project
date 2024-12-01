import { Component } from '@angular/core';
import { AutoPartService, IAutoPart } from '../../service/auto-part.service';
import { AutoPartComponent } from "../auto-part/auto-part.component";

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [AutoPartComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',

})
export class FavoriteComponent { 
  autoParts: IAutoPart[] = [];
  

  constructor(private autoPartService: AutoPartService) {
    this.getAutoPart();
  }

  getAutoPart() {
    this.autoPartService.getAllAutoPart().subscribe(resp => {
      this.autoParts = resp.filter(item => !!item.favourites);
    })
  }

  updateFavourite() {
    this.getAutoPart();
  }
}
