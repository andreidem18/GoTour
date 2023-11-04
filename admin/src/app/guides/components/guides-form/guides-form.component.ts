import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, WritableSignal, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuidesService } from '../../services/guides.service';
import { User } from 'src/app/shared/interfaces/User';
import { getFormData } from 'src/app/shared/helpers/getFormData';

@Component({
  selector: 'guides-form',
  templateUrl: './guides-form.component.html',
  styleUrls: ['./guides-form.component.css']
})
export class GuidesFormComponent implements OnChanges {

  @Input()
  public showForm: boolean = false;
  @Output()
  public showFormChange = new EventEmitter<boolean>();


  @Input()
  public selectedGuide?: User;
  @Output() selectedGuideChange = new EventEmitter<User | undefined>();


  public isUpdating: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['selectedGuide']?.currentValue) {
      this.isUpdating = false;
      this.imageURL = undefined;
      return;
    }
    const guide = (changes['selectedGuide'].currentValue as User);
    this.isUpdating = true;
    this.imageURL = guide.photo;
    this.userForm.reset(guide);
  }

  public isLoading: boolean = false;


  private fb = inject(FormBuilder);
  private guidesService = inject(GuidesService);



  public userForm: FormGroup = this.fb.group({
    photo: [null],
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  
  // Image Preview
  public imageURL?: string;

  showPreview(event: Event) {
    if(!event) return;
    const file = (event.target as HTMLInputElement).files![0]
    this.userForm.patchValue({
      photo: file
    });
    this.userForm.get('photo')!.updateValueAndValidity();
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file);
  }


  // Submit Form
  onSubmit() {

    
    const newUser = this.userForm.value;

    // Delete not used fields
    if(!newUser.password) delete newUser.password;
    if(typeof newUser.photo === 'string') delete newUser.photo;
    
    const formData = getFormData(newUser);
    formData.set('role', 'guide');

    let service;
    if(this.isUpdating){
      service = this.guidesService.updateGuide(formData, this.selectedGuide!.id);
    } else service = this.guidesService.createGuide(formData);
    
    this.isLoading = true;

    service
      .subscribe({
        next: () => {
          this.closeForm();
        },
        complete: () => this.isLoading = false,
      })
  }


  closeForm(){
    this.showFormChange.emit(false);
    this.selectedGuideChange.emit(undefined);
    this.userForm.reset();
  }

}
