import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader: Leader[] = LEADERS;
  LeaderErrMess! : string;

  constructor(private leaderservice: LeaderService) {}

  ngOnInit(): void {
  this.leaderservice.getLeaders().subscribe(leader => this.leader = leader,DishErrMess => this.LeaderErrMess= <any>this.LeaderErrMess);;
  }

}
