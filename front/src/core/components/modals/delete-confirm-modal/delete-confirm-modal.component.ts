import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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

  constructor(private ref: DynamicDialogRef) {
  }

  close() {
    this.ref.close()
  }

  delete() {
    this.ref.close({delete: true})
  }
}
