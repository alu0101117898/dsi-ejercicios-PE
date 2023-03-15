# Práctica 6 - Objetos y Clases genéricas - Ricardo Fariña Mesa


## Introducción

En esta práctica se entra en profundidad en el uso de objetos y clases genéricas en TypeScript. Se desarrollan tres ejercicios, uno de ellos utilizando clases genéricas e interfaces.

## Objetivos

Se busca desarrollar tres ejercicios en TypeScript utilizando objetos y clases genéricas. Se busca tener la capacidad de crear objetos y clases genéricas, y utilizarlas en los diferentes ejercicios. Así mismo, realizar una buena distribución de los ficheros y carpetas del proyecto, diviendo cada ejercicio en diferentes clases, al igual que con las pruebas unitarias. Se debe implementar un sistema de control de versiones con Git, y subir el proyecto a GitHub, realizar la documentación del proyecto con JSDoc y subir a la web de Covervalls para comprobar el porcentaje de cobertura de las pruebas unitarias.

## Desarrollo

### Ejercicio 1 - DSIFix

En este ejecicio se ha implementado una plataforma de streaming que permite realizar búsquedas de películas, documentales y series. Se ha creado una interfaz `Streamable` que define las funciones de búsqueda. Así se ha creado las clases `Pelicula`, `Serie` y `Documental` con sus respetivas clases extra 
`*Collection` que implementan las diferentes funciones de búsqueda. Se ha creado una clase abstracta `BasicStreamableCollection` que implementa la interfaz `Streamable` y que permite realizar búsquedas de películas, documentales y series. 

```
export abstract class BasicStreamableCollection<T extends Pelicula | Series | Documental > implements Streamable<T> {

  constructor(protected items: T[]) {
  }

  buscarPorNombre(nombre: string): T[] {
    return this.items.filter((item) => item.getNombre() == nombre);
  }

  buscarPorAño(año: number): T[] { 
    return this.items.filter((item) => item.getAño() == año);
  }
  abstract print(): string;
}
```
Clase `Pelicula` y `PeliculaCollection` que implementan la interfaz `Streamable` y que permite realizar búsquedas de artistas:
``` 
export class Pelicula {
  constructor( protected año: number, 
               protected nombre: string,
               protected duracion: number){
    this.año = año;
    this.nombre = nombre;
    this.duracion = duracion;
  }

  getAño(): number {
    return this.año;
  }

  getNombre(): string {
    return this.nombre;
  }

  getDuracion(): number {
    return this.duracion;
  }
}
```

```
import { BasicStreamableCollection } from "./basicStreamableCollection";
import { Pelicula } from "./peliculas";

export class PeliculasCollection extends BasicStreamableCollection<Pelicula> {

  constructor(items: Pelicula[]){
    super(items);
  }

  print() {
    let str = '';
    for (let i = 0; i < this.items.length; i++) {
      str += `${this.items[i].getNombre()}, ${this.items[i].getAño()}, ${this.items[i].getDuracion()} minutos. `;
    }
    return str;
  }

  buscarPorDuracion(tiempo: number): Pelicula[] {
    return this.items.filter((item) => item.getDuracion() == tiempo);
  }  
}

const coleccionPeliculas: PeliculasCollection = new PeliculasCollection([
  new Pelicula(1972, "El Padrino", 177 ),
  new Pelicula(2009, "Avatar", 162 ),
]);

console.log(coleccionPeliculas.print());
```

La clase `Serie` y `SerieCollection` que implementan la interfaz `Streamable` y que permite realizar búsquedas de series:

```

export class Series {

  constructor(protected año: number, 
              protected nombre: string, 
              protected temporadas: number){    
    this.año = año;
    this.nombre = nombre;
    this.temporadas = temporadas;
  }

  getNombre(): string {
    return this.nombre;
  } 

  getAño(): number {
    return this.año;
  } 

  getTemporadas(): number {
    return this.temporadas;
  }  
}
```

```
import { BasicStreamableCollection } from "./basicStreamableCollection";
import { Series } from "./series";

export class SeriesCollection extends BasicStreamableCollection<Series> {
  constructor(items: Series[]){
    super(items);
  }

  print() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += `${this.items[i].getNombre()}, ${this.items[i].getAño()}, ${this.items[i].getTemporadas()} temporadas. `;
    }
    return str;
  }

  buscarPorTemporada(temporada: number): Series[] {
    return this.items.filter((item) => item.getTemporadas() == temporada);
  }  
}
```

La clase `documentales` y `DocumentalesCollection` que implementan la interfaz `Streamable` y que permite realizar búsquedas de documentales:

```
/**
 * Se define la clase `Documental` que contiene los atributos `año`, `nombre` y `tipo`.
 */
export class Documental {

  constructor(protected año: number,
              protected nombre: string, 
              protected tipo: string){
    this.año = año;
    this.nombre = nombre;
    this.tipo = tipo;
  }

  getNombre(): string {
    return this.nombre;
  }

  getAño(): number {
    return this.año;
  }

  getTipo(): string {
    return this.tipo;
  }
}
```

```
import { BasicStreamableCollection } from "./basicStreamableCollection";
import { Documental } from "./documentales";

export class DocumentalCollection extends BasicStreamableCollection<Documental> {

  constructor(items: Documental[]){
    super(items);
  }

  print() {
    let str = "";
    for (let i = 0; i < this.items.length; i++) {
      str += `${this.items[i].getNombre()}, ${this.items[i].getAño()}, ${this.items[i].getTipo()}. `
    }
    return str;
  }

  buscarPorTipo(tipo: string): Documental[] {
    return this.items.filter((item) => item.getTipo() == tipo);
  }  
}
```

### Ejercicio 2 - Implementación de una lista y sus operaciones

Se ha realizado una interfaz `DeclaracionLista` que define las diferentes operaciones que se han desarrollado para la lista:

```
import { Lista } from "./lista";


export interface DeclaracionLista<T> {

  append(lista: Lista<T>): Lista<T>;
  concatenate(...lista: Lista<T>[]): Lista<T>;
  filter(lista): Lista<T>;
  length(): number;
  map(lista): Lista<T>;
  reduce(valor, acc, lista);
  reverse(): Lista<T>;
  forEach(lista);

}
```

Se ha desarrollado una clase `Lista` que implementa la interfaz `DeclaracionLista` y que contiene los métodos que se han definido en la interfaz,
desarrollando los métodos `append`, `concatenate`, `filter`, `length`, `map`, `reduce`, `reverse` y `forEach`:

```
import { DeclaracionLista } from "./objetoLista";

export class Lista<T> implements DeclaracionLista<T> {

  constructor(private lista: T[]) {}

  append(lista: Lista<T>) {
    for (let i = 0; i < lista.length(); i++) {
      this.lista[this.length()] = lista.lista[i];
    }
    return this;
  }

  concatenate(...lista: Lista<T>[]) {
    for (let i = 0; i < lista.length; i++) {
      this.append(lista[i]);
    }
    return this;
  }

  filter(lista) {
    const filteredList = new Lista([]);
    let j = 0;
    for (let i = 0; i < this.length(); i++) {
      if (lista(this.lista[i])) {
        filteredList.lista[j] = this.lista[i];
        j++;
      }
    }
    return filteredList;
  }

  length() {
    let i = 0;
    let result = 1;
    while (this.lista[i + 1] != undefined) {
      result++;
      i++;
    }
    return result;
  }

  map(lista) {
    for (let i = 0; i < this.length(); i++) {
      this.lista[i] = lista(this.lista[i]);
    }
    return this;
  }

  reduce(valor, acc, lista) {
    acc = valor;
    for (let i = 0; i < this.length(); i++) {
      acc = lista(acc, this.lista[i]);
    }
    return acc;
  }

  reverse() {
    const reversedList = new Lista([]);
    let j = 0;
    for(let i = 1; i <= this.length(); i++) {
      reversedList.lista[j] = this.lista[this.length()- i];
      j++;
    }
    return reversedList;
  }

  forEach(lista) {
    for(let i = 0; i < this.length(); i++) {
      lista(this.lista[i]);
    }
    return true;
  }
}
```

### Ejercicio 3 - Ampliando la biblioteca musical

Se ha ampliado la biblioteca musical, añadiendo la clase `Single`, que hereda de la clase `Disco`, ya que tenemos que un disco pueda estar compuesto de varias canciones o de solo una. A su vez, se ha arreglado el funcionamiento de este código, ya que en la anterior práctica no estaba implementado con programación orientada a objetos.

A continuación, se muestra el código de la clase `Artista`, `Disco` y `Cancion`:

```
import { Disco } from "./disco";
import { Discografia } from "./discografia";
import { Single } from "./single";

export class Artista {


  constructor(public nombre: string, 
              public oyentes: number, 
              public discografia:  Discografia<Disco | Single>) {
    this.nombre = nombre;
    this.oyentes = oyentes;
    this.discografia = discografia;
  }

  getNombre() {
    return this.nombre;
  }
  getOyentes() {
    return this.oyentes;
  }
  getDiscografia() {
    return this.discografia;
  } 
}

```

```
import { Cancion } from "./cancion";

export class Disco {

  constructor(public nombre: string, 
              public año: number, 
              public canciones: Cancion[]) {
    this.nombre = nombre;
    this.año = año;
    this.canciones = canciones;
  }

  getNombre() {
    return this.nombre;
  }

  getAño() {
    return this.año;
  }

  getCanciones() {
    return this.canciones;
  }
  
}

```

```

export class Cancion{

  constructor(public nombre: string, public duracion: number, 
              public generos: string[], public single: boolean, 
              public reproducciones: number) {
    this.nombre = nombre;
    this.duracion = duracion;
    this.generos = generos;
    this.single = single;
    this.reproducciones = reproducciones;
  }

  getNombre() {
    return this.nombre;
  }

  getDuracion() {
    return this.duracion;
  }

  getGeneros() {
    return this.generos;
  }

  getSingle() {
    return this.single;
  }

  getReproducciones() {
    return this.reproducciones;
  }

}
```
La clase `Single` hereda de la clase `Disco`:

```
import { Cancion } from "./cancion";

export class Single {

  constructor(public nombre: string, 
              public  año: number, 
              public versiones: Cancion[]) {
    this.nombre = nombre;
    this.año = año;
    this.versiones = versiones;
  }

  getNombre() {
    return this.nombre;
  }

  getAño() {
    return this.año;
  }

  getCanciones() {
    return this.versiones;
  }
}

```

La clase `Discografia` es una clase genérica que representa una discografía de un artista. Tiene como atributos `discos` y `singles`:

```

import { Disco } from "./disco";
import { Single } from "./single";

export class Discografia<T extends Disco | Single> {

  constructor(private discografia: T[]) {
  }

  getDiscografia() {
    return this.discografia;
  }
}
```

Por último, la clase bibliotecaMusical, que representa una biblioteca musical, tiene como atributos `artistas` y `discografias`, así como considerado el fichero `main` del ejercicio:

```
import { Artista } from "./artista"
import { Disco } from "./disco"
import {Cancion} from "./cancion"

export class BibliotecaMusical_ {
  artistas: Artista[] = [];

  almacenarArtista(artista: Artista): void {
    this.artistas.push(artista);
  }

  imprimirInformacion(): void {
    console.table(this.artistas);
  }

  buscarArtista(entradaArtista: Artista) {
    let flag = false;
    let nombreArtista = "";
    this.artistas.forEach((artista) => {
      if (artista.nombre == entradaArtista.nombre) {
        console.table(artista);
        flag = true;
        nombreArtista = artista.nombre;
      }
    });
    if (flag !== false) {
      return nombreArtista;
    } else {
      return undefined;
    }
  }

  buscarDisco(entradaDisco: Disco) {
    let disc = "";
    let flag = false;
    this.artistas.forEach((artista) => {
      artista.discografia.getDiscografia().forEach((disco) => {
        if (entradaDisco.nombre == disco.nombre) {
          disc = disco.nombre;
          flag = true;
          console.table(disco);
        }
      });
    });
    if (flag !== false) {
      return disc;
    } else {
      return undefined;
    }
  }

  buscarCancion(entradaCancion: Cancion) {
    let flag = false;
    let cancion = "";
    this.artistas.forEach((artista) => {
      artista.discografia.getDiscografia().forEach((disco) => {
        disco.getCanciones().forEach((nombreCancion) => {
          if (entradaCancion.nombre == nombreCancion.nombre) {
            console.table(nombreCancion);
            flag = true;
            cancion = nombreCancion.nombre;
          }
        });
      });
    });
    if (flag !== false) {
      return cancion;
    } else {
      return undefined;
    }
  }

  numeroCanciones(disco: Disco): number | undefined{
    let flag = false;
    let canciones = 0;
    this.artistas.forEach((artista) => { 
      artista.discografia.getDiscografia().forEach((discoElement) =>{
        if(discoElement.nombre == disco.nombre) {
          flag = true;
          canciones = discoElement.getCanciones().length;
        }
      });
    });
    if(flag === false) {
      return undefined;
    } else {
      return canciones;
    }
  }

  duracionDisco(disco: Disco): number | undefined{
    let flag = false;
    let duracion = 0;
    this.artistas.forEach((artista) => { 
      artista.discografia.getDiscografia().forEach((discoElement) =>{
        if(discoElement.nombre == disco.nombre) {
          flag = true;
          discoElement.getCanciones().forEach((nombreCancion) => {
            duracion += nombreCancion.duracion;
          });
        }
      });
    });
    if(flag === false) {
      return undefined;
    } else {
      return duracion;
    }
  }

  numeroReproducciones(disco: Disco): number | undefined {
    let flag = false;
    let reproduccionesTotales = 0;
    this.artistas.forEach((artista) => { 
      artista.discografia.getDiscografia().forEach((discoElement) =>{
        if(discoElement.nombre == disco.nombre) {
          flag = true;
          discoElement.getCanciones().forEach((nombreCancion) =>{
            reproduccionesTotales += nombreCancion.reproducciones;
          })
        }
      });
    });
    if(flag == false) {
      return undefined;
    } else {
      return reproduccionesTotales;
    }
  }
}
```
## Tests

Se han realizado tests para comprobar el correcto funcionamiento de las clases y métodos implementados. A su vez, se ha realizado el cubrimiento del código a través del uso de `Istanbul` y `Coveralls`. El resultado de los tests se puede ver en el siguiente código.

```
npm run coverage

> practica-6@1.0.0 coverage
> nyc npm test && nyc report --reporter=text-lcov | coveralls && rm -rf .nyc_output


> practica-6@1.0.0 test
> mocha

El Padrino, 1972, 177 minutos. Avatar, 2009, 162 minutos. 


  DocumentalCollection class tests
    1) coleccionDocumentales.print() returns The Walking Dead, 2010, Zombies. Breaking Bad, 2011, Drogas.
    ✔ coleccionDocumentales.buscarPorNombre('The Walking Dead') returns 'The Walking Dead, 2010, Zombies.'
    ✔ coleccionDocumentales.buscarPorAño(2011) returns 'Breaking Bad, 2011, Drogas.'
    ✔ coleccionDocumentales.buscarPorTematica('Zombies') returns 'The Walking Dead, 2010, Zombies.'

  PeliculasCollection class tests
    2) PeliculasCollection.print() returns 'El Padrino, 1972, 177 minutes. Avatar, 2009, 162 minutes.'
    ✔ PeliculasCollection.buscarPorNombre('El Padrino') returns 'El Padrino, 1972, 177 minutes.'
    ✔ PeliculasCollection.buscarPorAño(2009) returns 'Avatar, 2009, 162 minutes.'
    ✔ PeliculasCollection.buscarPorDuracion(162) returns 'Avatar, 2009, 162 minutes.'

  SeriesCollection class tests
    3) collection.print() returns 'The Walking Dead, 2010, 11 temporadas. Breaking Bad, 2011, 5 temporadas.'
    ✔ collection.buscarPorNombre('The Walking Dead') returns 'The Walking Dead, 2010, 11 temporadas.'
    ✔ collection.buscarPorAño(2011) returns 'Breaking Bad, 2011, 5 temporadas.'
    ✔ collection.buscarPorTemporada(5) returns 'Breaking Bad, 2011, 5 temporadas.'

  length() function tests
    ✔ test13.reduce() returns 'cuatro'
    ✔ test12.forEach() returns true
    ✔ test4.reduce() returns 15
    ✔ test14.reverse() returns ['cuatro', 'tres', 'dos', 'uno']
    ✔ test15.reverse() returns [5, 4, 3, 2, 1]
    ✔ test.length() returns 3
    ✔ test.length() returns 5
    ✔ test2.append(test3) returns ['d', 'e', 'f', 'g', 'h', 'i']
    ✔ test6.append(test7) returns [1, 2, 3, 4, 5, 6]
    ✔ test5.concatenate(test11) returns [6, 7, 8, 1, 2, 3, 4, 5]
    ✔ test8.concatenate(test9, test10) returns ['a', 'b', 'c', 'd', 'e', 'f']
    ✔ test8.filter() returns ['d', 'e', 'f']
    ✔ test4.filter() returns [4, 5]
    ✔ test13.map() returns ['eq', 'fq']

  Class Artista check
    ✔ artista1.getNombre() returns 'Artista1' 
    ✔ artista1.getOyentes() returns  1000000
    ✔ artista1.getDiscografia() returns discografia1

  Biblioteca Musical
    ✔ Funcionalidad para añadir Artista1 y Artista2 
┌─────────────┬─────────────────────────────────────────────────┬────────────┐
│   (index)   │                   discografia                   │   Values   │
├─────────────┼─────────────────────────────────────────────────┼────────────┤
│   nombre    │                                                 │ 'artista1' │
│   oyentes   │                                                 │    200     │
│ discografia │ [ [Disco], [Single], [Disco], ... 1 more item ] │            │
└─────────────┴─────────────────────────────────────────────────┴────────────┘
    ✔ Búsqueda de Artista1 debería devolver 'artista1'
    ✔ Búsqueda de Artista3 debería devolver undefined, porque el artista no está en la biblioteca
┌───────────┬───────────┬───────────┬──────────┐
│  (index)  │     0     │     1     │  Values  │
├───────────┼───────────┼───────────┼──────────┤
│  nombre   │           │           │ 'disco1' │
│    año    │           │           │   2010   │
│ canciones │ [Cancion] │ [Cancion] │          │
└───────────┴───────────┴───────────┴──────────┘
    ✔ Búsqueda de Disco1 debería devolver 'disco1'
    ✔ Búsqueda de Disco nuevo debería devolver undefined
┌────────────────┬───────────┬────────────┐
│    (index)     │     0     │   Values   │
├────────────────┼───────────┼────────────┤
│     nombre     │           │ 'cancion1' │
│    duracion    │           │    120     │
│    generos     │ 'genero2' │            │
│     single     │           │   false    │
│ reproducciones │           │    500     │
└────────────────┴───────────┴────────────┘
    ✔ Búsqueda de Canción1 debería devolver 'cancion1'
    ✔ Búsqueda de una canción nueva debería devolver undefined
    ✔ Conteo de canciones incluídas en el Disco1, debería retornar 2
    ✔ Conteo de canciones incluídas en el Disco2, debería retornar 0 porque no tiene canciones
    ✔ Conteo de canciones incluídas en un disco nuevo, debería retornar undefined.
    ✔ Cálculo de la duración del disco1 debería devolver 240
    ✔ Cálculo de la duración del disco2 debería devolver 0, porque no tiene canciones
    ✔ Cálculo de la duración de un disco nuevo debería devolver undefined.
    ✔ Cálculo del número de reproducciones del Disco3 debería devolver 120
    ✔ Cálculo del número de reproducciones del Disco2 debería devolver 0
    ✔ Cálculo del número de reproducciones de un disco nuevo debería devolver undefined.

  Class Cancion check
    ✔ cancion1.getNombre() returns 'La vida misma' 
    ✔ cancion1.getDuracion() returns 240 
    ✔ cancion1.getGeneros() returns 'pop' 
    ✔ cancion1.single returns false 
    ✔ cancion1.getReproducciones() returns 10000 

  Class Discob check
    ✔ disco1.getNombre() returns 'El Amor' 
    ✔ disco1.getAño() returns 1991
    ✔ disco1.getCanciones() returns disco1

  Getter de una discografía
    ✔ Getter de la discografía con un single y un disco
    ✔ Getter de la discografía con un single 
    ✔ Getter de la discografía con un disco 

  Class Single check
    ✔ single1.getNombre() returns 'Single1' 
    ✔ single1.getAño() returns 1991
    ✔ single1.getCanciones() returns both songs


  56 passing (57ms)
  3 failing


-------------------------------|---------|----------|---------|---------|-------------------
File                           | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------------|---------|----------|---------|---------|-------------------
All files                      |   99.13 |      100 |    97.5 |   99.06 |                   
 ejercicio-1                   |     100 |      100 |     100 |     100 |                   
  basicStreamableCollection.ts |     100 |      100 |     100 |     100 |                   
  documentales.ts              |     100 |      100 |     100 |     100 |                   
  documentalesCollection.ts    |     100 |      100 |     100 |     100 |                   
  peliculas.ts                 |     100 |      100 |     100 |     100 |                   
  peliculasCollection.ts       |     100 |      100 |     100 |     100 |                   
  series.ts                    |     100 |      100 |     100 |     100 |                   
  seriesCollection.ts          |     100 |      100 |     100 |     100 |                   
 ejercicio-2                   |     100 |      100 |     100 |     100 |                   
  lista.ts                     |     100 |      100 |     100 |     100 |                   
 ejercicio-3                   |    98.3 |      100 |   95.23 |   98.27 |                   
  artista.ts                   |     100 |      100 |     100 |     100 |                   
  bibliotecaMusical.ts         |   98.55 |      100 |   95.45 |   98.55 | 26                
  cancion.ts                   |   93.75 |      100 |   83.33 |   92.85 | 56                
  disco.ts                     |     100 |      100 |     100 |     100 |                   
  discografia.ts               |     100 |      100 |     100 |     100 |                   
  single.ts                    |     100 |      100 |     100 |     100 |                   
-------------------------------|---------|----------|---------|---------|-------------------
```
## Conclusiones

Se ha llegado a la conclusión de que es muy interesante realizar las herramientas de `Istanbul` y `Coveralls` para poder comprobar qué cantidad de nuestro código se ha probado y qué cantidad no, así como la implementación de este mismo comando para el uso de los tests. A nivel de programación orientada a objetos, poder desarrollar clases genéricas que se pueden utilizar como base para otra serie de clases y métodos.

## Bibliografía

  [Genéricos en TypeScript.](https://desarrolloweb.com/articulos/generics-typescript.html)