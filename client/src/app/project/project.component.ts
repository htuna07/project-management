import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Project, Progress, Task } from '../interface/interface';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { TaskComponent } from '../task/task.component';

interface ProgressContainer {
  id: 'todo' | 'in_progress' | 'done' | 'failed';
  values: Task[];
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnChanges {
  @Input() project: Project;

  todo: ProgressContainer = { id: 'todo', values: [] };
  inProgress: ProgressContainer = { id: 'in_progress', values: [] };
  done: ProgressContainer = { id: 'done', values: [] };
  failed: ProgressContainer = { id: 'failed', values: [] };

  progressContainers = [this.todo, this.inProgress, this.done, this.failed];

  constructor(
    private dialog: MatDialog,
    private projectService: ProjectService,
    private taskService: TaskService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProject(changes.project.currentValue);
  }

  updateProject(project: Project) {
    this.project = project;

    this.todo.values = [];
    this.inProgress.values = [];
    this.done.values = [];
    this.failed.values = [];

    this.project.tasks.forEach((task) => {
      const id = Progress[task.progress];
      const container = this.progressContainers.find((c) => c.id == id);
      container.values.push(task);
    });
  }

  drop(event: CdkDragDrop<any, any>) {
    const previousContainer = this.progressContainers.find(
      (c) => c.id == event.previousContainer.id
    );

    const currentContainer = this.progressContainers.find(
      (c) => c.id == event.container.id
    );

    if (previousContainer.id == currentContainer.id) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const task: Task = event.container.data[0];
      task.progress = Progress[event.container.id];

      this.taskService
        .update(task.id, task)
        .toPromise()
        .then(() =>
          this.projectService
            .find(this.project.id)
            .toPromise()
            .then((project) => this.updateProject(project))
        );
    }
  }

  addTask() {
    const emptyTask: Task = {
      title: '',
      description: '',
      progress: Progress.todo,
    };

    this.dialog
      .open(TaskComponent, { data: emptyTask })
      .afterClosed()
      .toPromise()
      .then((task) => {
        if (!task) {
          return;
        }

        // INSERT
        this.project.tasks.push(task);
        this.projectService
          .update(this.project.id, this.project)
          .toPromise()
          .then((project) => this.updateProject(project));
      });
  }
}
