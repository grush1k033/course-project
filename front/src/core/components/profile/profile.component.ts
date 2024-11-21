import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SkeletonModule } from "primeng/skeleton";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {RouterOutlet} from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService, IUser } from '../../service/auth.service';
import { ProfileService } from '../../service/profile.service';


@Component({
    selector: 'app-profile',
    standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    FooterComponent,
    RouterLink,
    RouterLinkActive
  ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user: IUser | null = null;
  constructor(
    public router: Router,
    public auth: AuthService,
    public profileService: ProfileService
  ) {
    this.profileService.getUser().subscribe(user => {
      this.user = user
    })
  }

  navigateToEditProfile() {
    this.router.navigate(['profile/edit']).then()
  }


  logout() {
    this.router.navigate(['profile/edit']).then()
    this.auth.logout();
  }
}
