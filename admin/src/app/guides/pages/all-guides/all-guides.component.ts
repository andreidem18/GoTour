import { Component, computed, inject, signal } from '@angular/core';
import { GuidesService } from '../../services/guides.service';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/shared/interfaces/User';

@Component({
  selector: 'app-all-guides',
  templateUrl: './all-guides.component.html',
  styleUrls: ['./all-guides.component.css']
})
export class AllGuidesComponent {

  private confirmationService = inject(ConfirmationService);
  private guidesService = inject(GuidesService);
  get allGuides() { return this.guidesService.allGuides }

  public showForm: boolean = false;
  public selectedGuide?: User;

  isFormVisible(visible: boolean = false){
    this.showForm = visible;
  }

  onDeleteGuide(guide: User){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.guidesService.deleteGuide(guide.id);
      },
    });
  }

  onUpdateGuide(guide: User){
    this.isFormVisible(true);
    this.selectedGuide = guide;
  }

}
