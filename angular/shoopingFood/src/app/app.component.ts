import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

function getCookie(name) {
  var cookieArr = document.cookie.split(";");
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if(name == cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'shoopingFood';
  constructor(private http: HttpClient, private router:Router) { 
  var token = getCookie("jwt");

    const headers = new HttpHeaders()
    .set('token', token)
    .set('Content-Type', 'application/json');

        this.http.get('http://localhost:8001/checktoken', { headers: headers })
        
        .subscribe(data => {}, error => {
          if(error){
            this.router.navigate(['login'])
          }
        });
  }
}
