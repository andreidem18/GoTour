import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';




@NgModule({
  declarations: [],
  providers: [
    MessageService,
    DataViewLayoutOptions,
  ],
  exports: [
    ButtonModule,
    CardModule,
    CalendarModule,
    ChartModule,
    ConfirmDialogModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    EditorModule,
    GalleriaModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    ListboxModule,
    MenuModule,
    MenubarModule,
    MessagesModule,
    PanelModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    RatingModule,
    StepsModule,
    TabMenuModule,
    TagModule,
    TieredMenuModule,
    ToastModule,
  ]
})
export class PrimengModule { }
