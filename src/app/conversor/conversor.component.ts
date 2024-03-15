import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('https://economia.awesomeapi.com.br/json/available/uniq')
      .subscribe((moedas: any) => {
        console.log(moedas);
      });
  }

  calcular() {
    alert("Usando o event binding")
  }

}
