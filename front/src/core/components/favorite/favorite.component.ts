import { Component } from '@angular/core';
import { AutoPartService, IAutoPart } from '../../service/auto-part.service';
import { AutoPartComponent } from "../auto-part/auto-part.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [AutoPartComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',

})
export class FavoriteComponent {
  loading = true;
  autoParts: IAutoPart[] = [];


  constructor(private autoPartService: AutoPartService) {
    this.getAutoPart();
  }

  getAutoPart() {
    this.loading = true;
    this.autoPartService.getAllAutoPart(true)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(resp => {
      this.autoParts = resp.filter(item => !!item.favourites);
    })
  }

  updateFavourite() {
    this.getAutoPart();
  }
}
