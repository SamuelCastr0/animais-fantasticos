import outsideClick from './outsideclick.js';

export default class DropdownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);
    this.activeClass = 'active'

    // define touchstart e click como argumento padrão de event
    if (events === undefined) this.events = ['touchstart', 'click']; 
    else this.events = events;

    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // ativa o dropdownmenu e adiciona a função que observa o click fora dele
  activeDropdownMenu(event) {
    event.preventDefault();
    event.currentTarget.classList.add(this.activeClass);
    outsideClick(event.currentTarget, this.events, () => {
      event.currentTarget.classList.remove(this.activeClass);
    });
  }

  // adiciona os eventos ao dropdown menu
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent()
    }
    return this;
  }
}
