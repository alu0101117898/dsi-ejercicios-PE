 /**
  * 
  * @param n Parámetro que almacena el número de números primos
  * que se van a generar.
  * @returns La cadena con los correspondientes `n` números primos.
  */
export function CrearPrimos (n: number): number[] | undefined {
  let num = 1;
  let bool = true;
  const cadena: number[] = [];
  while (this.cadena.length != n) {
    for (let i = 2; 1 < num; i++) {
      if (num % i == 0 ) {
        bool = false;
      }
      if (bool) {
        this.cadena.push(num);
      }
      num++;
      bool = true;
    }
  }
  return cadena;
}

/**
 * Se define la clase PrimeNumber, que va contener una serie de 
 * métodos.
 */
export class PrimeNumber {

  /**
   * Se define `cadenaPrimos` para almacenar todos los números 
   * primos seguidos, los cuáles se generarán a través de la entrada
   * `n`.
   */
  private cadenaPrimos: number[] = [];
  private static primeNumber: PrimeNumber;

  private constructor (private n: number) {
    this.cadenaPrimos = CrearPrimos(n);
  }
  
  public static getPrimeNumber(n: number): PrimeNumber  { 
    if (!PrimeNumber.primeNumber) {
      PrimeNumber.primeNumber = new PrimeNumber(n);
    }
    return PrimeNumber.primeNumber;
  }
  
  getPrimo(n: number): number {
    return this.cadenaPrimos[n];
  } 

  getCadenaPrimos(): number[] {
    return this.cadenaPrimos;
  }

  setCadenaPrimos(n: number) {
    this.cadenaPrimos = CrearPrimos(n);
  }

 getNPrimerosPrimos(n: number): number[] | undefined {
    if (n < 0 || n > this.cadenaPrimos.length) {
      return undefined;
    }
    const result: number[] = [];
    for (let i = 0; i < n; i++) {
      result.push(this.getPrimo[i]);
    }
    return result;
  }
  
  /**
   * 
   * @param n Límite por la izquierda del array.
   * @param m Límite por la derecha del array.
   * @returns Los valores del array de primos entre los parámetros
   * que se pasan por pantalla.
   */
  getRango(n: number, m: number): number[] | undefined {
    if(n < 0 || m < 0 || m < n || n > this.cadenaPrimos.length || m > this.cadenaPrimos.length) {
      return undefined;
    }
    const result: number[] = [];
    for (let i = n; i < m; i++) {
      result.push(this.getPrimo[i]);
    }
    return result;
  }
}

let a = PrimeNumber.getPrimeNumber(10);
console.log(a);