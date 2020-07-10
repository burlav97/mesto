export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
 
  addItemPrepend(element) { //принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(element); //принимает параметр element и вставляет его в контейнер методом prepend
  }

  addItemAppend(element) {
    this._container.append(element);//принимает параметр element и вставляет его в контейнер методом append
  }

  clear() {
    this._container.innerHTML = '';
  }
 
  renderItems(items, userId) { //отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
    this.clear();
    items.forEach(item => { //принимает DOM-элемент и добавляет его в контейнер.
      this._renderer(item, userId);
    });
  }
}
