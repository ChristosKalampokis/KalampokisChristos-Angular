import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MessagesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})




export class AppComponent {
  title = 'Tour of Heroes';
}