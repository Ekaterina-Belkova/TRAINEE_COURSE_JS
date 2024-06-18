// 1
const user = {
  name: 'Bob',
  funcFunc() {
    return function() {
      console.log(this);
    }
  },
  funcArrow() {
    return () => {
      console.log(this);
    }
  },
  arrowFunc: () => {
    return function() {
      console.log(this);
    }
  },
  arrowArrow: () => {
      return () => {
      console.log(this);
    }
  },
};

user.funcFunc()(); // global // Вызывается, как обычная функция, а не как метод объекта, поэтому ссылается на глобальный контекст.
user.funcArrow()(); // user // В данном случае стрелочная функция ссылается на объект user, так как внешней областью видимости является метод funcArrow, а его контекстом является объект user. Поэтому this будет ссылаться на объект user.
user.arrowFunc()(); // global // Стрелочная функция будет ссылаться на глобальный контекст.
user.arrowArrow()(); // global // Стрелочная функция будет ссылаться на глобальный контекст.

// 2
var poke1 = {name:'Pikachu'};
var poke2 = {name:'Chermander'};
var poke3 = {name:'Bulbasaur'};

var sayName = function(){ console.log(this.name) }

sayName.bind(poke1).bind(poke2).call(poke3); // Pikachu, так как сработает только первый bind


// 3
const obj = {
  firstName: 'Bill',
  lastName: 'Ivanov',

  showFirstName: function () {
    console.log(this.firstName);
  },

  showLastName: () => {
    console.log(this.lastName);
  }
}

obj.showFirstName(); // Bill // this в функции function declaration ссылается на объект obj
obj.showLastName(); // undefined // this в стрелочной функции ссылается на global и выводит undefined 

obj.showFirstName.bind({ firstName: 'Boris' })(); // Boris // bind создал новую функцию и при вызове this ссылается на заданный аргумент Boris
obj.showFirstName.bind({ firstName: 'Boris' }).bind({ firstName: 'Oleg' })(); // Boris // только первый bind сработает 

obj.showLastName.bind({ lastName: 'Boris' })(); // undefined // this в стрелочной функции ссылается на global и выводит undefined. Стрелочные функции не поддерживают изменение значения this через методы bind, call или apply.

// 4

const user1 = {
  name: 'Mike',
  fn: function () {
    console.log(this.name)
  }
}

setTimeout(user1.fn, 1000) // undefined

// Что будет выведено в консоль после истечения таймаута и почему?
// Undefined. setTimeout получил функцию отдельно от объекта user (именно здесь функция и потеряла контекст)

// Сделайте так, чтоб починить и выводило "Mike"
const user2 = {
  name: 'Mike',
  fn() {
    console.log(this.name);
  }
};

setTimeout(function() {
  user2.fn(); // Mike
}, 1000);

// Подсказка - ответ найдете в 5 ссылке README 

// 5
//Исправьте cтроку(***), чтобы всё работало (других строк изменять не надо, кроме password, чтобы проверить if else).

function askPassword(ok, fail) {
  let password = 'rockstar2'
  if (password == "rockstar") ok();
  else fail();
}

let user3 = {
  name: 'Вася',

  loginOk() {
    console.log(`${this.name} logged in`);
  },

  loginFail() {
    console.log(`${this.name} failed to log in`);
  },

};

askPassword(user3.loginOk.bind(user3), user3.loginFail.bind(user3)) //*** используем bind, чтобы сохранить правильный контекст this для методов user3.loginOk и user3.loginFail