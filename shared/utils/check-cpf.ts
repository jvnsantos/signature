
const toValidate = (pop: number, cpfArr: string[]) => cpfArr
.filter((digit, index, array) => index < array.length - pop && digit)
.map(el => +el);

const rest = (count: number, pop: number, cpfArr: string[]) => (toValidate(pop, cpfArr)
.reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10;

const validCPF = (cpf: string): boolean => {
let rCpf = cpf;
if (typeof rCpf !== 'string') return false
rCpf = rCpf.replace(/[^\d]+/g, '')
if (rCpf.length !== 11 || !!rCpf.match(/(\d)\1{10}/)) return false
const cpfArr: string[] = rCpf.split('')
const validator = cpfArr
    .filter((digit, index, array) => index >= array.length - 2 && digit)
    .map(el => +el);
return !(rest(10, 2, cpfArr) !== validator[0] || rest(11, 1, cpfArr) !== validator[1])
}

export default validCPF;