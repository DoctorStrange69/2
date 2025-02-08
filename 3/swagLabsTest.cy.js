describe('Тестирование функциональности логина', () => {
    it('Успешный вход в систему', () => {
      // Переходим на страницу логина
      cy.visit('/');
  
      // Вводим логин и пароль
      cy.get('[data-test="username"]').type('standard_user'); // Используем data-test атрибуты для более надежных селекторов
      cy.get('[data-test="password"]').type('secret_sauce');
  
      // Нажимаем кнопку логина
      cy.get('[data-test="login-button"]').click();
  
      // Проверяем, что перешли на страницу товаров и отображается заголовок "Products"
      cy.url().should('include', '/inventory.html');
      cy.get('.title').should('contain', 'Products');
    });
  });
  
  describe('Тестирование сортировки товаров', () => {
    // Авторизация перед каждым тестом
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  

    it('Сортировка товаров по цене: от низкой к высокой', () => {
      cy.get('[data-test="product_sort_container"]').select('Price (low to high)');

      cy.get('.inventory_item_price')
        .then(($prices) => {
          const prices = Cypress._.map($prices, (el) => parseFloat(el.innerText.replace('$', '')));
          const sortedPrices = [...prices].sort((a, b) => a - b); // Создаем копию массива перед сортировкой
  
          // Сравниваем отсортированный массив с исходным
          expect(prices).to.deep.eq(sortedPrices);
        });
    });
  
    // Тест: Сортировка по убыванию цены
    it('Сортировка товаров по цене: от высокой к низкой', () => {
      // Выбираем опцию сортировки "Price (high to low)"
      cy.get('[data-test="product_sort_container"]').select('Price (high to low)');
  
      // Получаем цены товаров и проверяем, что они отсортированы правильно
      cy.get('.inventory_item_price')
        .then(($prices) => {
          const prices = Cypress._.map($prices, (el) => parseFloat(el.innerText.replace('$', '')));
          const sortedPrices = [...prices].sort((a, b) => b - a);
  
          // Сравниваем отсортированный массив с исходным
          expect(prices).to.deep.eq(sortedPrices);
        });
    });
  });
  
  // Описываем набор тестов для проверки добавления товаров в корзину и оформления заказа
  describe('Тестирование добавления товаров в корзину и оформления заказа', () => {
    // Авторизация перед каждым тестом
    beforeEach(() => {
      cy.visit('/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });
  
    // Тест: Добавление двух товаров в корзину и успешное оформление заказа
    it('Добавление двух товаров и оформление заказа', () => {
  
      // Добавляем первый товар в корзину
      cy.get('.inventory_item').first().find('[data-test^="add-to-cart"]').click(); //Использование data-test для кнопки "Add to cart"
  
      // Добавляем второй товар в корзину
      cy.get('.inventory_item').eq(1).find('[data-test^="add-to-cart"]').click();
  
      // Переходим в корзину
      cy.get('.shopping_cart_link').click();
  
      // Проверяем, что в корзине два товара
      cy.get('.cart_item').should('have.length', 2);
  
      // Переходим к оформлению заказа
      cy.get('[data-test="checkout"]').click(); // Использование data-test для кнопки "Checkout"
  
      // Заполняем информацию о доставке
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
  
      // Нажимаем "Continue"
      cy.get('[data-test="continue"]').click(); // Использование data-test для кнопки "Continue"
  
      // Проверяем, что перешли на страницу завершения заказа и отображается сообщение об успехе
      cy.url().should('include', '/checkout-complete.html');
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    });
  });