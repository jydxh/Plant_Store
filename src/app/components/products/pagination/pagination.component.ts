import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  imports: [CommonModule, MatIconModule],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() pageSize!: number;
  @Input() current!: number;
  @Input() totalItem!: number;
  @Input() totalPage!: number;
  constructor(private router: Router, private route: ActivatedRoute) {}

  private start = 1;
  pageArray: (number | undefined)[] = []; // Initialize as empty array
  pageCount = 0; // Initialize as 0

  ngOnInit(): void {
    // Calculate pageCount and pageArray here, after inputs are available
    this.calculatePagination();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['current'] || changes['pageSize'] || changes['totalItem']) {
      this.calculatePagination();
    }
  }

  private calculatePagination(): void {
    if (!this.pageSize || !this.totalItem || !this.current) return;
    this.pageCount = Math.ceil(this.totalItem / this.pageSize);
    this.calculatePageArray();
  }

  private navigateToPage(page: number): void {
    //update URL query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge', // Keep other query params
    });
  }
  private calculatePageArray(): void {
    if (this.pageCount <= 10) {
      this.pageArray = Array.from(
        { length: this.pageCount },
        (_, index) => index + 1
      );
    } else {
      const currentGroup = Math.floor((this.current - 1) / 10);
      const startPage = currentGroup * 10 + 1;
      const endPage = Math.min(startPage + 9, this.pageCount);
      const length = endPage - startPage + 1;

      this.pageArray = Array.from({ length }, (_, index) => {
        if (startPage + index <= this.totalPage) {
          return startPage + index;
        } else {
          return;
        }
      });
    }
  }

  handleClick(item: number | undefined) {
    // dealing with  route.puss('...?page=item')
    if (item && item !== this.current && item > 0 && item <= this.pageCount) {
      this.navigateToPage(item);
    }
  }

  toFirstPage() {
    // route to first page
    if (this.current !== 1) {
      this.navigateToPage(1);
    }
  }
  toLastPage() {
    if (this.current !== this.pageCount) {
      this.navigateToPage(this.pageCount);
    }
  }
  handleNextPage() {
    if (this.current < this.pageCount) {
      this.navigateToPage(this.current + 1);
    }
  }
  handlePrevPage() {
    if (this.current > 1) {
      this.navigateToPage(this.current - 1);
    }
  }
}
