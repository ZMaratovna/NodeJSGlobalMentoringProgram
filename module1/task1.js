const write = (string) => process.stdout.write(string);
const reverse = (input) => input.toString().split('').reverse().join('');
const writeReversedStr = (input) => { 
    write(reverse(input));
}
process.openStdin().addListener('data', writeReversedStr);
