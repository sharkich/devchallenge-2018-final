import { Component, OnInit } from '@angular/core';

import {ExamplesService} from '../_shared/services/examples.service';
import {ExampleModel} from '../_shared/models/example.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  public example: ExampleModel;
  public isLoading: boolean;
  public error: Error;

  constructor(
    private exampleService: ExamplesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true;
    const id: string = this.activatedRoute.snapshot.params['id'];
    this.exampleService.getById(id)
      .then((example) => {
        this.example = example;
        this.isLoading = false;
      })
      .catch((err) => {
        this.error = err;
        this.isLoading = false;
      });
  }

}
