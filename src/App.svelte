<script>
  import { Task } from "./task";
  import { fly } from "svelte/transition";

  let task = "";
  let tasks = [];
  let labelText = "Add your task";
  let isWarningLabel = false;
  let angerMeter = 0;

  const taskManager = new Task();

  const addTask = () => {
    angerMeter = angerMeter + 1;
    if (angerMeter === 5) {
      const bigger = document.querySelector("label");
      bigger.style.fontSize = "18px";
      labelText = "PLEASE ENTER A TASK!!!";
      isWarningLabel = true;
      angerMeter = 0;
      return;
    }
    if (task === "") {
      labelText = "Please enter a task";
      isWarningLabel = true;
      return;
    }
    const newTask = {
      id: Math.random(),
      task: task,
    };
    taskManager.addTask(newTask);
    tasks = taskManager.tasks;
    task = "";
  };

  const warningRemoval = () => {
    labelText = "Add your task";
    isWarningLabel = false;
    const bigger = document.querySelector("label");
    bigger.style.fontSize = "16px";
    angerMeter = 0;
  };

  const removeTask = (/** @type {any} */ task) => {
    taskManager.removeTask(task);
    tasks = taskManager.tasks;
  };
</script>

<main>
  <div class="form_wrap">
    <div class="input_wrap">
      <input
        type="text"
        required
        id="task"
        bind:value={task}
        on:click={warningRemoval}
        class={isWarningLabel ? "red-border" : ""}
      />
      <label for="task" class={isWarningLabel ? "red-text" : ""}
        >{labelText}</label
      >
    </div>
  </div>
  <button on:click={addTask} class="add-btn">+</button>
  <div class="tasks-area">
    {#each tasks as task (task.id)}
      <div
        class="task"
        in:fly={{ y: 100, duration: 500 }}
        out:fly={{ y: 100, duration: 500 }}
      >
        <div>
          <input type="checkbox" id={task} />
          <label for={task} class="task-label">{task.task}</label>
        </div>
        <button on:click={() => removeTask(task)}>🗑️</button>
      </div>
    {/each}
  </div>
</main>

<style lang="scss">
  main {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input[type="text"] {
      border: 2px solid #afbdcf;
      border-radius: 5px;
      height: 47.1px;
      width: 370px;
      color: #000000;
      font-size: 17.1px;
      padding-left: 20px;
      padding-top: 4px;
      box-shadow: none;
    }

    input:focus + label,
    input:valid + label {
      font-size: 12px;
      color: #afbdcf;
      top: -4px;
      left: 10px;
      background: #ffffff;
      padding: 0px 5px 0px 5px;
    }

    .input_wrap {
      width: auto;
      height: auto;
      position: relative;
    }

    .input_wrap label {
      font-family: arial;
      font-size: 16px;
      color: #afbdcf;
      padding: 17px;
      position: absolute;
      top: 0;
      left: 0;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
      pointer-events: none;
    }

    input[type="text"]:focus {
      outline: none;
    }

    .add-btn {
      border-radius: 50%;
      border: 1px solid rgba(128, 128, 128, 0.22);
      font-size: 2rem;
      width: 50px;
      font-weight: bold;
      margin-top: 0.3em;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      color: grey;

      &:hover {
        background-color: rgba(128, 128, 128, 0.22);
        color: green;
      }
    }

    .tasks-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1em;
      height: 300px;
      overflow-y: auto;

      .task {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 2px solid #afbdcf;
        border-radius: 8px;
        padding: 0.7em;
        width: 650px;
        margin: 0.5em 0;

        .task-label {
          font-size: 1rem;
          color: black;
          background: none;
        }

        &:hover {
          background-color: rgba(128, 128, 128, 0.107);
        }
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
      }
    }

    .red-border {
      border: 1.9px solid red !important;
    }

    .red-text {
      color: red !important;
    }
  }
</style>
