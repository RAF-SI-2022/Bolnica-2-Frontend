import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/models';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  httpClient: any;
  users:User[]=[];
  constructor(private router: Router) {
    
   }


  ngOnInit(): void {
    const token=localStorage.getItem('token');
    let lbz="";
    try{
      let decodedHeader = jwt_decode(localStorage.getItem('token') as string);
      lbz=( decodedHeader as unknown as { lbz: string }).lbz;
    }
    catch{}
    
    return this.httpClient.get('/'+lbz,token )
            .pipe({
                next: (res: any) => this.users=res,
                error: (e:any) => {
                    console.log(e);
                }
            }
        );
  }

}
function jwt_decode(arg0: string) {
  throw new Error('Function not implemented.');
}
