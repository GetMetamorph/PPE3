import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
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

function LoadHome() {
  var token = getCookie("jwt");
  var user: any = jwt.decode(token);

  if(user.HSE_Id == 1){
    $("#resume").append(`
    
    <h1>Creer votre maison</h1>
    <form action="http://localhost:8001/house/${user.USR_Id}" method="post" autocomplete="off">

        <input type="text" name="HSE_Name" placeholder="Nom de la maison" id="HSE_Name" required>

        <input type="text" name="HSE_Address" placeholder="Adresse de la maison" id="HSE_Address" required>

        <input type="submit" value="Creer">
    </form>
    
    `)

  }else{
    $("#resume").append(`
    <h5 class="card-title">Commencez la gestion de votre inventaire</h5>
    <p class="card-text">ShoppingFood est un outil permettant de garder un suivi de vos produits, par membre de votre maison, et de créer votre liste de course de manière simple et efficace.</p>
    <a href="/inventory" class="btn btn-primary">Gerer mon inventaire</a>
    `)
    
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    LoadHome()
  }

}
