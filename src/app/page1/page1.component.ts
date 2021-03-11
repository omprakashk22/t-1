import { Component, OnInit } from '@angular/core';
import { debounceTime, delay } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { StateService } from '../_state.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';
  
  userslist = new Array();
  private subs = new SubSink();
  loadingIndicator = true;
  reorderable = true;

  call:any;

  constructor( private service: StateService ) { }

  ngOnInit(): void {
    this.call  = setTimeout(() => {    
      this.getdata();  
    }, 5000);
  }

  getdata(){
    return this.subs.sink = this.service.getUsers().subscribe(res =>{
      this.userslist = (res as any[]).map(data => {
        return {
          id : data.id,
          name : data.name,
          email : data.email,
          address : `${data.address.street},${data.address.suite},${data.address.city},${data.address.zipcode}`,
          phone : data.phone,
          company : data.name,
        }
      })
    });
  }

  ngOnDestroy():void{
    clearTimeout(this.call);
    this.subs.unsubscribe();
  }

}
