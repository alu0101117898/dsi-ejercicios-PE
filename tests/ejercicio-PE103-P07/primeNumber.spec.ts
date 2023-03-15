import "mocha";
import { expect } from "chai";
import { PrimeNumber, CrearPrimos } from "../../src/ejercicio-PE103-P07/primeNumber"


const primeNumber = PrimeNumber.getPrimeNumber(25);

describe("PrimeNumber Tests", () => {
   
    it('Comprobar el método CrearPrimos esté correcto.', () => {
      expect(CrearPrimos(5)).to.be.eql([1, 3, 5, 7, 11]);  
      expect(CrearPrimos(7)).to.be.eql([1, 3, 5, 7, 11, 13, 17]); 
    });
    it('primeNumber.getCadenaPrimos().length returns 25', () => {
      expect(primeNumber.getCadenaPrimos().length).to.be.equal(25);
    });
    it('Se comprueba los métodos set y get', () => {
      expect(primeNumber.getCadenaPrimos().length).to.be.equal(25);
      primeNumber.setCadenaPrimos(15);
      expect(primeNumber.getCadenaPrimos().length).to.be.equal(15);   
    });
    it('Comprobar que funciona correctamente el método GetRango', () =>  {
      expect(primeNumber.getRango(-1, 2)).to.be.equal(undefined);
      expect(primeNumber.getRango(5, 2)).to.be.equal(undefined);
      expect(primeNumber.getRango(1, -2)).to.be.equal(undefined);
      expect(primeNumber.getRango(2, 5)).to.be.equal([5, 7, 11]);
    })

    it('Comprobar el funcionamiento de getNPrimerosPrimos', () => {
      expect(primeNumber.getNPrimerosPrimos(-1)).to.be.equal(undefined);
      expect(primeNumber.getNPrimerosPrimos(100)).to.be.equal(undefined);
      expect(primeNumber.getNPrimerosPrimos(3)).to.be.equal([]);
    });

});