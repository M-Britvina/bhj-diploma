/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);

    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();

    if (!user) {
      return;
    }

    Account.list(user, (error, response) => {
      if (response.success) {
        const selectField = this.element.querySelector(".accounts-select");
        selectField.innerHTML = "";
        response.data.forEach(item => {
          selectField.insertAdjacentHTML("beforeend", `<option value="${item.id}">${item.name}</option>`);
        });
      } else {
        alert(error);
      }
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (error, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
        App.update();
      } else {
        alert(error);
      }
    });
  }
}