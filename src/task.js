export class Task {
  constructor() {
    this.tasks = [];
  }

  /**
   * @param {any} task
   */
  addTask(task) {
    this.tasks.push(task);
  }

  /**
   * @param {any} task
   */
  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }
}
