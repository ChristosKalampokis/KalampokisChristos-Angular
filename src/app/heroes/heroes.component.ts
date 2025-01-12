import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes!: Hero[];
  //selectedHero?: Hero;
  //hero: Hero | undefined;

  constructor(private heroService: HeroService) { }



  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() { this.getHeroes(); }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => { this.heroes.push(hero); });
  }


  delete(hero: Hero): void {
    this.heroes =
      this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }


  //onSelect(hero: Hero): void {
  //  this.selectedHero = hero; this.messageService.add(`HeroesComponent:
  //  Selected hero id=${hero.id}`);
  // }
}