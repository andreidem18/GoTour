import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../interfaces/Review';

interface StarsData {
  stars: number;
  quantity: number;
  percentaje: number;
}

@Component({
  selector: 'tour-reviews-chart',
  templateUrl: './tour-reviews-chart.component.html',
  styleUrls: ['./tour-reviews-chart.component.css']
})
export class TourReviewsChartComponent implements OnInit {

  @Input()
  public reviews: Review[] = [];

  public starsData: StarsData[] = [];

  public starsAverage: number = 0;

  ngOnInit(): void {
    this.starsData = [
      this.getStars(5),
      this.getStars(4),
      this.getStars(3),
      this.getStars(2),
      this.getStars(1),
    ]
    this.starsAverage = this.getStarsAverage();
  }

  getStars(starQuantity: number): StarsData{
    const totalReviews = this.reviews.length;
    const quantity = this.reviews
      .filter(r => +r.rating === starQuantity)
      .length
    const percentaje = quantity * 100 / totalReviews;
    return { stars: starQuantity, quantity, percentaje }
  }

  getStarsAverage(): number {
    const totalReviews = this.reviews.length;
    if(totalReviews === 0) return 0;
    let sum = 0;
    this.reviews.forEach(r => sum += +r.rating);
    return Math.round(sum / totalReviews * 10) / 10;
  }


}
