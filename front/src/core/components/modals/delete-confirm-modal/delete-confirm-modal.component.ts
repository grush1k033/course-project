import { AfterViewInit, Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-delete-confirm-modal',
  standalone: true,
  imports: [
    Button,
  ],
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.scss',
  providers: [DialogService]
})
export class DeleteConfirmModalComponent {
  order: boolean = false;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.order = config?.data?.order || false;
  }

  

  close() {
    this.ref.close()
  }

  delete() {
    this.ref.close({delete: true})
  }
}
