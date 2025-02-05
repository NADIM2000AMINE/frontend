import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',  
  styleUrls: ['./task-list.component.css']   
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {
    title: '',
    description: '',
    status: 'TODO'
  };
 
  currentPage: number = 1;
  tasksPerPage: number = 5; 

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (error) => console.error('Error loading tasks:', error)
    });
  }


  searchQuery: string = '';

  searchTasks() {
    if (this.searchQuery.trim()) {
      this.taskService.searchTasks(this.searchQuery).subscribe({
        next: (tasks) => {
          this.tasks = tasks; 
          this.currentPage = 1; 
        },
        error: (error) => console.error('Error searching tasks:', error)
      });
    } else {
      this.loadTasks();
    }
  }

  addTask() {
    if (this.newTask.title && this.newTask.description) {
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.loadTasks();
          this.newTask = { title: '', description: '', status: 'TODO' };
        },
        error: (error) => console.error('Error adding task:', error)
      });
    }
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe({
      next: () => this.loadTasks(),
      error: (error) => console.error('Error updating task:', error)
    });
  }

  deleteTask(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe({
        next: () => this.loadTasks(),
        error: (error) => console.error('Error deleting task:', error)
      });
    }
  }


  get totalPages(): number {
    return Math.ceil(this.tasks.length / this.tasksPerPage);
  }
  
  paginatedTasks(): Task[] {
    const startIndex = (this.currentPage - 1) * this.tasksPerPage;
    return this.tasks.slice(startIndex, startIndex + this.tasksPerPage);
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
