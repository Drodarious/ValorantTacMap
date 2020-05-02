import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TacMapService {

  private AGENT = null;
  private ABILITY = null;
  private ENEMY: boolean = null;

  constructor() { }

  setActive(agent, ability, isEnemy){
    this.AGENT = agent;
    this.ABILITY = ability;
    this.ENEMY = isEnemy;
  }

  getActive(){

    if(!this.AGENT || !this.ABILITY){

      return null;

    } else {

      return {
        agent: this.AGENT,
        ability: this.ABILITY,
        src: `assets/agents/${this.AGENT.name}/${this.ABILITY.name}${this.ENEMY ? '-alt' : ''}.png`
      }

    }

  }
}
