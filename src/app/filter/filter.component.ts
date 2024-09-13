import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  selectedValue: string | null = null;
  minValue: number | null = null;
  maxValue: number | null = null;

  get dynamicPlaceholder(): string {
    return this.selectedValue || 'Price Range';
  }

  isDropdownOpen: boolean = false;

  applyPriceRange() {
    if (this.minValue !== null && this.maxValue !== null) {
      if (this.maxValue > this.minValue) {
        this.selectedValue = `Min: ${this.minValue} Birr, Max: ${this.maxValue} Birr`;
        this.isDropdownOpen = false
      } else {
        alert('Max price should be greater than Min price');
      }
    }
  }

}
