import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TacMapService } from '../tac-map.service';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  @Input() isEnemyTeam = false;

  agents: any;

  constructor(
    private http: HttpClient,
    private renderer: Renderer2,
    private tacMap: TacMapService
  ) { }

  ngOnInit(): void {

    this.http.get('assets/agents/agents.json').subscribe((results) => {
      this.agents = results;
    });

  }

  selectAbility(event, agent, ability) {

    let deselect = false;

    document.querySelectorAll('.agent-list-active').forEach((element) => {

      this.renderer.removeClass(element, 'agent-list-active');

      if (event.target === element) {
        deselect = true;
      }

    })

    if (!deselect) {

      this.renderer.addClass(event.target, 'agent-list-active');
      this.renderer.addClass(event.target.parentElement.parentElement, 'agent-list-active');
      this.tacMap.setActive(agent, ability, this.isEnemyTeam);

    } else {

      this.tacMap.setActive(null, null, null);

    }

  }


}
