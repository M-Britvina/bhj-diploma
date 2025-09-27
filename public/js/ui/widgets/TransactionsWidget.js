/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error("Передан пустой элемент");
    }

    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.openModal(".create-income-button", "newIncome");
    this.openModal(".create-expense-button", "newExpense");
  }

  openModal(buttonSelector, modalName) {
    const button = this.element.querySelector(buttonSelector);
    button.addEventListener("click",
      () => {
        App.getModal(modalName).open();
      },
      false
    );
  }
}
