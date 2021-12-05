import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project, Task } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  PROJECTS_URL = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  find(id: number) {
    return this.http.get(`${this.PROJECTS_URL}/${id}`) as Observable<Project>;
  }

  findAll() {
    return this.http.get(this.PROJECTS_URL) as Observable<Project[]>;
  }

  update(id: number, project: Project) {
    return this.http.put(
      `${this.PROJECTS_URL}/${id}`,
      project
    ) as Observable<Project>;
  }
}
