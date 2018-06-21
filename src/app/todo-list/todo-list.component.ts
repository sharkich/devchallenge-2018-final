import { Component, OnInit } from '@angular/core';

import {ExampleModel} from '../_shared/models/example.model';
import {ExamplesService} from '../_shared/services/examples.service';
import {PageController} from '../_shared/controllers/page.controller';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent extends PageController implements OnInit {

  public examples: ExampleModel[] = [];

  constructor(private exampleService: ExamplesService) {
    super();
  }

  ngOnInit() {
    this.$loadingPromise = this.exampleService.list()
      .then((examples) => {
        this.examples = examples;
      });
  }

  public link(example: ExampleModel): string {
    return `/examples/${example.id}`;
  }

}
