import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SkeletonModule } from "primeng/skeleton";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from "@angular/router";
import {RouterOutlet} from '@angular/router';
import { FooterComponent } from "../footer/footer.component";


@Component({
    selector: 'app-profile',
    standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    FooterComponent
],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(
    public router: Router,
  ) {
    
  }

  navigateToEditProfile() {
    this.router.navigate(['profile/edit'])
  }

  
}