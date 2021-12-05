import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interface/interface';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  projects$: Observable<Project[]> = of([]);

  selectedProject = undefined;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.projectService.findAll();
  }
}
