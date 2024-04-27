import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Moeda } from '../../models/moeda.model';
import { AwesomeApiService } from '../../services/awesomeapi.service';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css'
})
export class ConversorComponent implements OnInit {

  moedas: Moeda[] = [];

  moedaOrigem?: Moeda;
  moedaDestino?: Moeda;
  valor: number = 0;
  resultado?: number;
  valorCotacao: number = 0;
  dataCotacao: string = '';

  loading: boolean = false;

  constructor(private service: AwesomeApiService, private sharedDataService: SharedDataService) {

  }

  ngOnInit(): void {
    // Carregar usando o pipe async
    this.service.getMoedas().subscribe((moedas: Moeda[]) => {
      this.moedas = moedas;
    });

    this.setDefaultValues();
  }

  setDefaultValues() {
    this.moedaOrigem = this.sharedDataService.moedaOrigem ?? { codigo: 'USD', descricao: 'Dólar Americano' };
    this.moedaDestino = this.sharedDataService.moedaDestino ?? { codigo: 'BRL', descricao: 'Real Brasileiro' };
    this.valor = 1;
  }

  compareMoedaFn(m1: Moeda, m2: Moeda): boolean {
    return m1 && m2 && m1.codigo === m2.codigo;
  }

  currencyFormat(value: number): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: this.moedaDestino?.codigo,
      maximumFractionDigits: 4
    }).format(value);
  }

  onMoedaChange() {
    this.resetarResultado();
  }

  private resetarResultado() {
    this.resultado = 0;
  }

  switchMoedas() {
    let moedaAux = this.moedaOrigem;
    this.moedaOrigem = this.moedaDestino;
    this.moedaDestino = moedaAux;
    this.resetarResultado();
  }

  calcular() {
    if (this.moedaOrigem && this.moedaDestino && this.valor > 0) {
      this.loading = true;
      this.resetarResultado();
      this.service.getCotacao(this.moedaOrigem, this.moedaDestino).subscribe({
        next: cotacao => {
          // Realizar o cálculo da cotação
          this.resultado = this.valor * cotacao.getValor();
          this.valorCotacao = cotacao.getValor();
          this.dataCotacao = Intl.DateTimeFormat('pt-BR').format(cotacao.createDate!);
          this.loading = false;
        },
        error: (err) => {
          console.log(JSON.stringify(err));
          alert('Não foi possível realizar a conversão!');
          this.loading = false;
        }
      });
    }
  }

}
