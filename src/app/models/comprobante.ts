export class Comprobante {
    Nro: number;
        fecha: Date;
        concepto: string;
        estado: string;
        descripcion: string;
        debitos?: any;
        creditos?: number;
        id_tipodecomprobante: number;
        id_cuenta: number;
        id_Moneda: number;
}
