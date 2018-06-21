import {ActivatedRoute} from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {ExampleModel} from '../_shared/models/example.model';
import {PageController} from '../_shared/controllers/page.controller';
import {ExamplesService} from '../_shared/services/examples.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent extends PageController implements OnInit {

  public example: ExampleModel;

  constructor(
    private exampleService: ExamplesService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    const id: string = this.activatedRoute.snapshot.params['id'];
    this.$loadingPromise = this.exampleService.getById(id)
      .then((example) => {
        this.example = example;
      });
  }

}
