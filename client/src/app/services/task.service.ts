import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Task } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  TASKS_URL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  insert(task: Task) {
    return this.http.post(this.TASKS_URL, task);
  }

  update(id: number, task: Task) {
    return this.http.put(`${this.TASKS_URL}/${id}`, task);
  }
}
