import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { StateService } from '../_state.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  private subs = new SubSink();
  complete = 0;
  incomplete = 0;

  // data = [this.complete, this.incomplete];
  label = ['complete','incomplete'];
  colors = [{ 
    backgroundColor: ['green','red'],
    borderColor: 'rgba(135,206,250,1)'}
  ];
  data = new Array();
  call: any;
  constructor( private service: StateService ) { }

  ngOnInit(): void {
    this.call = setTimeout(() => {
      this.subs.sink = this.service.getTodo().subscribe(res =>{
        (res as any[]).map(el => {
          el.completed? this.complete++:this.incomplete++;
        })
      });
      setTimeout(() => {
        let data = [this.complete,this.incomplete];
        console.log(data);
        this.data = data;
      }, 500);
    }, 6000);
  }

  ngOnDestroy():void{
    clearTimeout(this.call);
    this.subs.unsubscribe();
  }

}
