import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  agents: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.http.get('assets/agents/agents.json').subscribe((results) => {
      this.agents = results;
    });

  }


}
