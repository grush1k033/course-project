import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {AutoPartService} from '../../service/auto-part.service';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  value: string = '';

  constructor(private autoPartService: AutoPartService) {}

  changeSearch() {
    this.autoPartService.search = this.value;
  }
}
