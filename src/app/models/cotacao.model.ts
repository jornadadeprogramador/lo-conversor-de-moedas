export class Cotacao {
    name: string;
    varBid: number;
    code: string;
    codein: string;
    bid: number;
    ask: number;
    createDate?: Date | null;

    constructor(value?: any) {
        this.name = value?.name;
        this.varBid = value?.varBid;
        this.code = value?.code;
        this.codein = value?.codein;
        this.bid = Number(value?.bid);
        this.ask = Number(value?.ask);
        this.createDate = value?.create_date ? new Date(value?.create_date) : null;
    }

    getValor(): number {
        return (this.bid + this.ask) / 2;
    }
}