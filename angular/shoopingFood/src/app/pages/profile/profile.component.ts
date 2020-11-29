import { Component, OnInit } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import $ from 'jquery';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

function GetUser() {
  var token = getCookie("jwt");
  var user = jwt.decode(token);
  return user
}

function LoadProfile(user) {
  $("#USR_Username").append(user.USR_Firstname)
  $("#USR_Firstname").append(user.USR_Firstname)
  $("#USR_Mail").append(user.USR_Mail)
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
    LoadProfile(GetUser())
  }

}
