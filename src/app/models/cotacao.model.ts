export class Cotacao {
    name: string;
    varBid: number;
    code: string;
    codein: string;
    bid: number;
    ask: number;
    createDate?: Date | null;

    constructor(value?: any) {
        this.name = value?.name?.substring(0, value?.name?.indexOf('/'));
        this.varBid = Number(value?.varBid);
        this.code = value?.code;
        this.codein = value?.codein;
        this.bid = Number(value?.bid);
        this.ask = Number(value?.ask);
        this.createDate = value?.create_date ? new Date(value?.create_date) : null;
    }

    getValor(): number {
        return (this.bid + this.ask) / 2;
    }

    getValorMonetario(): string {
        return Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: this.codein,
            maximumFractionDigits: 4,
            minimumFractionDigits: 4
          }).format(this.getValor());
    }

    getVariacao(): string {
        let prefix = '';
        if (this.varBid > 0) {
            prefix = "+";
        }
        return prefix + this.varBid?.toFixed(4);
    }
}