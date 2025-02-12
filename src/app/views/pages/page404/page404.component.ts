import { Component } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { variables } from 'src/app/variables';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component {
  rutas = variables;

  handleMouseMove = (e: { pageX: number; pageY: number }) => {
    const icons = document.querySelectorAll('.parallax-icon');
    icons.forEach((icon) => {
      const speed: any = icon.getAttribute('data-speed');
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      (icon as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
    });
  };
}
