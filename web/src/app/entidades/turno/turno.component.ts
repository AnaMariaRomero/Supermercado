export class TurnoComponent {
  public key: string;
  public code: string;
  public standbyTime: string;
  public arrivalTime: Date;

  constructor(result) {
    this.key = result.key;
    this.code = result.codigo;
    this.standbyTime = result.tiempoEspera;
    this.arrivalTime = result.tiempoLlegada;
   }

   getTimeFormat(): string {
    this.arrivalTime = new Date();
    return this.arrivalTime.getHours() + ':' + this.arrivalTime.getMinutes() + ' hs'
  }

}
