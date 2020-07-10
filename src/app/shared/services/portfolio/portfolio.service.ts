import { Injectable } from '@angular/core';
import { PortfolioDB } from '../../fake-db/portfolio-items';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Http } from '@angular/http';
import { IContactInput } from '../../../home/contact/contact.component';

@Injectable()
export class PortfolioService {
  public portfolioItems;

  constructor(
    private http: Http
  ) {
    let portfolioDB = new PortfolioDB();
    this.portfolioItems = portfolioDB.portfolio_items;
  }

  // get portfolioItems
  getPortfolioItems() {
    const rows = this.portfolioItems;
    return of(rows.slice()).pipe(delay(500));
  }


  postToSheets(formData: any) {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("email", formData.email);

    fd.append("subject", formData.subject);
    fd.append("message", formData.message);
    return this.http.post("https://script.google.com/macros/s/AKfycbx9E8FZdXzHq92iOcRxm3u6DTaxTqEam4rkoQc2byZYbzdMjbc/exec", fd);
  }
}
