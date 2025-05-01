import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-result-chart',
  imports: [],
  templateUrl: './result-chart.component.html',
  styleUrl: './result-chart.component.scss',
})
export class ResultChartComponent implements OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() correctAnswers: number = 0;
  @Input() totalQuestions: number = 0;
  private chart!: Chart;

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.correctAnswers !== undefined &&
      this.totalQuestions !== undefined
    ) {
      this.renderChart();
    }
  }

  private renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const incorrect = this.totalQuestions - this.correctAnswers;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Correct', 'Incorrect'],
        datasets: [
          {
            data: [this.correctAnswers, incorrect],
            backgroundColor: ['#4CAF50', '#F44336'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: (context: TooltipItem<'doughnut'>) => {
                const label = context.label || '';
                const value = Number(context.raw);
                const percentage = Math.round(
                  (value / this.totalQuestions) * 100
                );
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      },
    });
  }
}
