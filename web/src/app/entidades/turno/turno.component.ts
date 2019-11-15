/*creamos una clase que represente a nuestro turno de manera individual.
Sirve para hacernos referencia con el turno que tenemos en la
base de datos*/
export class TurnoComponent {
  public key: string;
  public code: string;
  public standbyTime: string;
  public arrivalTime: Date;

  /*el constructor nos ayuda a traer el elemento de la base y construirlo en
  base a ese. Lo "traducimos" al formato que usamos en nuestro modelo.
  La base tiene terminos en castellano, aca tratamos de usar el ingles.
  Por tema de que se entiendan y sean más intuitivos los metodos, dejamos en español los metodos.*/
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
