import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public isLoading = true;
  public error: Error = null;

  @Input() promise: Promise<any>;

  constructor() {
  }

  ngOnInit() {
    this.isLoading = true;

    this.promise
      .then((res) => {
        this.isLoading = false;
        return res;
      })
      .catch((err) => {
        this.isLoading = false;
        this.error = err;
        return Promise.reject(err);
      });
  }

}
