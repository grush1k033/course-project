import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auto-part-items',
  standalone: true,
  imports: [],
  templateUrl: './auto-part-items.component.html',
  styleUrl: './auto-part-items.component.scss'
})
export class AutoPartItemsComponent implements OnInit{

  id: string | null = null;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = (this.activatedRoute.snapshot.params as {id: string}).id;
    this.getAutoPart(this.id);
  }


  getAutoPart(id: string) {

  }
}
