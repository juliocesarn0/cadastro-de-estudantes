import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;

  heroes: Hero[] = [];

  constructor(private heroService: HeroService, 
              private messageService: MessageService) { }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }

  //getHeroes(): void {
  //  //Essa chamada é bloqueante!!!!!!
  //  this.heroes = this.heroService.getHeroes();
  //}

  getHeroes(): void {
    this.heroService.getHeroes()
                    .subscribe(
                        //Esse codigo vai ser executado em 
                        //algum momento (assincrono/não bloqueante)
                        //
                        // Esse simbolo  =>  é uma arrow function
                        heroes => this.heroes = heroes
                    );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {

    //Remove do array
    this.heroes = this.heroes.filter(h => h !== hero);

    //Remove do BackEnd
    this.heroService.deleteHero(hero.id).subscribe();
  }

}
