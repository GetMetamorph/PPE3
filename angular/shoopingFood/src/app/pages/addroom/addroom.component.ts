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
  var user : any = jwt.decode(token);
  return user 
}


@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.scss']
})
export class AddroomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#form_add").append(`<input name="HSE_Id" style="display:none;" value = "${GetUser().HSE_Id}">`)
  }

}
