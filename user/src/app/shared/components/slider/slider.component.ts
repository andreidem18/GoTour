import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

  @Input() 
  public slides: any[] = [];
  @Input()
  public autoPlay: boolean = false;
  @Input()
  public transitionInterval: number = 4000;

  @ContentChild('slide')
  public slide!: TemplateRef<any>;

  public activeIndex: number = 0;
  private interval?: NodeJS.Timer;

  ngOnInit(): void {
    this.interval = setInterval(() => this.nextSlide(), this.transitionInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  nextSlide() {
    if (this.activeIndex >= this.slides.length-1) {
      this.activeIndex = 0;
    } else {
      ++this.activeIndex;
    }
  }

  prevSlide() {
    if (this.activeIndex <= 0) {
      this.activeIndex = this.slides.length-1;
    } else {
      ++this.activeIndex;
    }
  }

}
