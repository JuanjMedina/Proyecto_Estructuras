export class ConjuntoDisjunto {
  private readonly conjunto: Map<number, Set<number>>

  constructor () {
    this.conjunto = new Map()
  }

  agregarNotaACarpeta (notaId: number, carpetaId: number): void {
    if (!this.conjunto.has(carpetaId)) {
      this.conjunto.set(carpetaId, new Set([notaId]))
    } else {
      this.conjunto.get(carpetaId)?.add(notaId)
    }
  }

  cambiarCarpetaDeNota (notaId: number, nuevaCarpetaId: number): void {
    let carpetaActualId = -1
    for (const [carpetaId, notas] of this.conjunto) {
      if (notas.has(notaId)) {
        carpetaActualId = carpetaId
        break
      }
    }

    if (carpetaActualId !== -1) {
      // Mover la nota a la nueva carpeta
      this.conjunto.get(carpetaActualId)?.delete(notaId)
      this.agregarNotaACarpeta(notaId, nuevaCarpetaId)
    }
  }

  obtenerConjuntoDeCarpeta (carpetaId: number): Set<number> | undefined {
    return this.conjunto.get(carpetaId)
  }

  obtenerCarpetaDeNota (notaId: number): number | null {
    for (const [carpetaId, notas] of this.conjunto) {
      if (notas.has(notaId)) {
        return carpetaId
      }
    }
    return null
  }
}
