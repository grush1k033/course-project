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
  imageProfileSrc = 'assets/icons/zaglushka.svg'
  selectedFile: File | null = null;
  constructor(
    public router: Router,
    public auth: AuthService,
    public profileService: ProfileService
  ) {
    this.getUser();
  }

  getUser() {
    this.profileService.getUser().subscribe(user => {
      this.user = user
    })
  }

  onSelectedFile(event: any) {
    this.selectedFile = event.target.files[0] as File;
    this.uploadFile();
  }

  uploadFile(){
    const formData = new FormData();
    if(this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.profileService.addFile(formData).subscribe((res: any) => {
        if(res.body?.data) {
          this.imageProfileSrc = "http://localhost:3000/files/" + res.body.data.filename;
          this.profileService.updateImage(this.imageProfileSrc, this.user?.id as string).subscribe();
          this.getUser();
        }
      })
    }
    
  }

  navigateToEditProfile() {
    this.router.navigate(['profile/edit']).then()
  }


  logout() {
    this.router.navigate(['profile/edit']).then()
    this.auth.logout();
  }
}
