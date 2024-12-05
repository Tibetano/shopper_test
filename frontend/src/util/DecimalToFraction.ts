function decimalToFraction(numero: number): string {
    
    const casasDecimais = numero.toString().split('.')[1].length;
      
    let numerador:number = numero * 10 ** casasDecimais;
    let denominador:number = 10 ** casasDecimais;
      
    function mdc(a:number, b:number) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
      
    const divisorComum:number = mdc(numerador, denominador);
    numerador /= divisorComum;
    denominador /= divisorComum;
      
    return `${numerador}/${denominador}`;
}

export default decimalToFraction