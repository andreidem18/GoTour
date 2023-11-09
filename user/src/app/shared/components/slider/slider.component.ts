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
  public transitionInterval: number = 6000;
  public animation: boolean = false;

  @ContentChild('slide')
  public slide!: TemplateRef<any>;

  public activeIndex: number = 0;
  private interval?: NodeJS.Timer;

  ngOnInit(): void {
    this.interval = setInterval(() => this.nextSlide(), this.transitionInterval);
    setTimeout(() => this.animation = true, 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.nextSlide(), this.transitionInterval);
  }

  nextSlide() {
    this.restartInterval();
    if (this.activeIndex >= this.slides.length-1) {
      this.activeIndex = 0;
    } else {
      ++this.activeIndex;
    }
  }

  prevSlide() {
    this.restartInterval();
    if (this.activeIndex <= 0) {
      this.activeIndex = this.slides.length-1;
    } else {
      --this.activeIndex;
    }
  }

}
