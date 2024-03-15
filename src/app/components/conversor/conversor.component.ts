import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../models/moeda.model';
import { AwesomeApiService } from '../../services/awesomeapi.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[] = [];

  constructor(private service: AwesomeApiService) {

  }

  ngOnInit(): void {
    // Carregar usando o pipe async
    this.service.getMoedas().subscribe((moedas: Moeda[]) => {
      this.moedas = moedas;
    });
  }

  calcular() {
    alert("Usando o event binding")
  }

}
