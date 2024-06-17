// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
// console.log('1');
// setTimeout(() => console.log('2'), 1);
// let promiseNew = new Promise((resolve) => {
//     console.log('3');
//     resolve();
// });
// promiseNew.then(() => console.log('4'));
// setTimeout(() => console.log('5'));
// console.log('6');

// Вывод в консоли: 1, 3, 6, 4, 5, 2

// Сначала консоль выведет '1'. 
//'2' попадет в Call Stack и потом отправится в очередь макрозадач, так как это SetTimeout. 
// Консоль выведет '3', эта строка отработает синхронно.
// (На 7 строке resolve переведет promise в состояние fulfilled.)
// '4' попадет в Call Stack и затем в очередь микрозадач.
// '5' попадет в Call Stack и затем в очередь макрозадач.
// Консоль выведет '6'.
// После этого, отработает очередь микрозадач и выведет '4'.
// Затем отработает очередь очередь макрозадач. Сначала выведет '5', так как на этой строке у setTimeout не указано время, значит можно считать, что там стоит 0 (или время ожидания составляет 4 миллисекунды).
// И в конце выведет '1'.

//////////////////////////////
// 2)
// let promiseTree = new Promise((resolve, reject) => {
//     resolve("a");
//     console.log("1");
//     setTimeout(() => {
//         console.log("2");
//     }, 0);
//     console.log("3");
// });

// Вывод в консоли: 1, 3, 2

// Promise попадает в CallStack и в микрозадачи.
// Консоль синхронно выводит '1' и затем '3'
// После '1' setTimeout попадает в очередь макрозадач и после '3' консолько выводит '2'


/////////////////////////
// 3)
// let promiseTwo = new Promise((resolve, reject) => {
//     resolve("a");
// });
// promiseTwo
//     .then((res) => {
//         return res + "b";
//     })
//     .then((res) => {
//         return res + "с";
//     })
//     .finally((res) => {
//         return res + "!!!!!!!"; // finally ничего не возвращает 
//     })
//     .catch((res) => {
//         return res + "d"; // игнорируется, так как в состоянии fulfilled
//     })
//     .then((res) => {
//         console.log(res);
//     });

    // Вывод в консоли: abc

/////////////////////////////
// 4)
// function doSmth() {
//     return Promise.resolve("123");
// }
// doSmth()
//     .then(function (a) {
//         console.log("1", a); //1 123
//         return a;
//     })
//     .then(function (b) {
//         console.log("2", b); // 2 123
//         return Promise.reject("321");// promise отклонен 
//     })
//     .catch(function (err) { 
//         console.log("3", err); // 3 321
//     })
//     .then(function (c) {
//         console.log("4", c); // 4 undefined, так как catch не возвращает результат
//         return c;
//     });

    // Вывод в консоли: 1 123 2 123 4 undefined

///////////////////////////
// 5)
// console.log("1");
// setTimeout(function () {
//     console.log("2");
// }, 0);
// Promise.resolve().then(() => console.log("3"));
// console.log("4");

// Вывод в консоли: 1, 4, 3, 2

//////////////////////////
// 7)
// async function a() {
//   console.log("a"); // ожидает выполнения
// }

// console.log("1");

// (async function () {
//   console.log("f1");
//   await a(); // выполняется async function a() 
//   console.log("f2");
// })();
// console.log("2");

// Вывод в консоли: 1, f1, a, f2, 2

////////////////////////////////
//8)
// console.log(1);

// setTimeout(() => console.log(2));// микро

// async function func() {
//   console.log(3);

//   await new Promise((resolve) => {
//     console.log(4);
//     resolve();
//     console.log(5);
//   })
//     .then(() => console.log(6)) // макро
//     .then(() => console.log(7)); // макро

//   console.log(8);
// }

// setTimeout(() => console.log(9)); // микро

// func();

// console.log(10);

// Вывод в консоли: 1 3 4 5 10 6 7 8 2 9

///////////////////////////////////
// 9)*
// function foo(callback) {
//     setTimeout(() => {
//         callback('A');
//     }, Math.random() * 100);
// }
// function bar(callback) {
//     setTimeout(() => {
//         callback('B');
//     }, Math.random() * 100);
// }
// function baz(callback) {
//     setTimeout(() => {
//         callback('C');
//     }, Math.random() * 100);
// }

// foo(console.log)
// bar(console.log)
// baz(console.log)

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))

// Решение:

// let returnPromise = (func) => {
//   return new Promise(resolve => {
//       func(arg => {
//           resolve(arg)
//       })
//   })
// }


// let ABC = () => {
//   return Promise.all([
//       returnPromise(foo),
//       returnPromise(bar),
//       returnPromise(baz)
//   ]).then(result => result.forEach(item => console.log(item)))
// }

// ABC()

///////////////
// todo Объяснить код, рассказать какие консоли и в какой последовательности будут, а затем переписать его на промисы
function resolveAfter2Seconds(x) {
    console.log(`Какой Х пришёл -> ${x}`)
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x); //
        }, 5000);
    });
}
async function add1(x) {
    console.log('add1 Hello')
    const a = await resolveAfter2Seconds(20);
    const b = await resolveAfter2Seconds(30);
    console.log('add1 Bye')
    return x + a + b;
}
add1(10).then(console.log);

// Вывод в консоль:
// 'add Hello' 
// Какой Х пришёл -> 20
// Какой Х пришёл -> 30
// 'add1 Bye'
// 60


// Синхронно вызывается 'add Hello' 
// Вызываем функцию resolveAfter2Seconds(20) и дожидаемся её выполнения и затем через 5 секунд промис, функция попадает в Call Stack и затем в очередь микрозадач . В консоли выводится Какой Х пришёл -> 20.
// Вызываем функцию resolveAfter2Seconds(30) и дожидаемся её выполнения и затем через 5 секунд промис,функция попадает в Call Stack и затем в очередь микрозадач. В консоли выводится Какой Х пришёл -> 30.
// После всех await вызывается 'add1 Bye'
// add1 вернет 60


