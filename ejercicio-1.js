const numbers = [
  {
    number: 0,
    count: 0,
  },
];

for (let i = 0; i < 10; i++) {
  let num = Math.floor(Math.random() * 20);

  numbers.forEach((element) => {
    if (element.number === num) {
      element.count++;
    } else {
      numbers.push({
        number: num,
        count: 1,
      });
    }
  });
}

console.log(numbers);
