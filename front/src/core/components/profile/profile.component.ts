import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SkeletonModule } from "primeng/skeleton";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {RouterOutlet} from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { AuthService, IUser } from '../../service/auth.service';
import { ProfileService } from '../../service/profile.service';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
    selector: 'app-profile',
    standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
  providers: [DialogService]
})
export class ProfileComponent {
  user: IUser | null = null;
  imageProfileSrc = 'assets/icons/zaglushka.svg'
  selectedFile: File | null = null;
  constructor(
    public router: Router,
    public auth: AuthService,
    public profileService: ProfileService,
    public dialogService: DialogService
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

  ref: DynamicDialogRef | undefined;
  show() {
    this.ref = this.dialogService.open(DeleteConfirmModalComponent, {
      header: 'Вы действительно хотите выйти?',
      data: {
        logout: true
      },
      width: '30vw',
      contentStyle: { overflow: 'auto' },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    });

    this.ref.onClose.subscribe((data?: {delete: boolean}) => {
      if(data?.delete) {
        this.logout();
      }
    })
  }
}
