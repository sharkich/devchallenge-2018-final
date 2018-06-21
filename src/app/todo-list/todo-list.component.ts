import { Component, OnInit } from '@angular/core';
import {ExamplesService} from '../_shared/services/examples.service';
import {ExampleModel} from '../_shared/models/example.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  public examples: ExampleModel[] = [];

  constructor(private exampleService: ExamplesService) { }

  ngOnInit() {
    this.exampleService.list()
      .then((examples) => {
        this.examples = examples;
      });
  }

  public link(example: ExampleModel): string {
    return `/examples/${example.id}`;
  }

}
