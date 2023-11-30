import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent,
    FooterComponent
  ]
})
export class SharedModule { }
