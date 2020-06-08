import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle: String = 'Product List';
    imageWidth: number = 25;
    imageHeight: number = 25;
    imageMargin: number = 1;
    showImage: boolean = true;

    _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    errorMessage: string = "";

    constructor(private productService: ProductService) {
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        let filteredList: IProduct[] = []
        this.products.forEach(product => {
            if (product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) {
                filteredList.push(product)
            }
        });
        return filteredList;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
        this.filteredProducts = this.products;
    }
}