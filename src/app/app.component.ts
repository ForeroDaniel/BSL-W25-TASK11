import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { QuoteInterface } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'random-quotes-machine';
  quotesUrl: string = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
  colorsUrl: string = 'https://raw.githubusercontent.com/bahamas10/css-color-names/master/css-color-names.json';
  quotesArray = [];
  colorsArray:string[] = [];
  currentQuote: QuoteInterface = {quote: '',
    author: ''};
  quote: string = '';
  author: string = '';
  currentColor: string = '';

  
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getQuotes()
    this.getColors()
  }

  getQuotes(){
    this.http.get(this.quotesUrl).subscribe((quotes: any) => {
      console.log(quotes.quotes);
      this.quotesArray = quotes.quotes;
      this.newQuote()
    });
  }
  getColors(){
    this.http.get(this.colorsUrl).subscribe((colors: any) => {
      console.log(colors);
      this.colorsArray = Object.keys(colors);
      this.newColor()
    });
  }

  newQuote(){
    let randomQuote = Math.floor(Math.random()*this.quotesArray.length);
    this.currentQuote = this.quotesArray[randomQuote]
    console.log(this.currentQuote)
    this.quote = this.currentQuote.quote;
    this.author = this.currentQuote.author;
    this.getColors()
  }
  newColor(){
    let randomColor = Math.floor(Math.random()*this.colorsArray.length);
    this.currentColor = this.colorsArray[randomColor]
  }
}
