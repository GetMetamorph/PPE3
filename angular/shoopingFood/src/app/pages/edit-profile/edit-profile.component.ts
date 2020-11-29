import { Component, OnInit } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import $ from 'jquery';


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
  document.getElementById("form_editP").setAttribute("action",`http://localhost:8001/user/${user.USR_Id}`)
  document.getElementById("exampleFirstname").setAttribute("placeholder",`${user.USR_Firstname}`)
  document.getElementById("exampleInputEmail1").setAttribute("placeholder",`${user.USR_Mail}`)

}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    LoadProfile(GetUser())
  }

}
