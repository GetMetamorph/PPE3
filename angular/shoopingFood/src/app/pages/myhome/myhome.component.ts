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

function LoadHome(house) {
  $("#cardContainer").empty()
  house.forEach(room => {
    $("#cardContainer").append(`
    <div class="col-sm-6 col-md-4" >

    <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="../../../assets/s1.png" alt="Room image">
                <div class="card-body">
                    <h5 class="card-title">${room.ROM_Name}</h5>
                    <p class="card-text">Coût de la pièce : 20 $</p>
                    <a href="/room" class="btn btn-primary">Inventaire</a>
                    <button type="button" class="btn btn-danger" onclick="confirm('êtes vous sûr de vouloir supprimer cette pièce ?'); event.stopPropagation();">Supprimer</button>
                </div>
            </div>
    `)
  });
  
}

@Component({
  selector: 'app-myhome',
  templateUrl: './myhome.component.html',
  styleUrls: ['./myhome.component.scss']
})
export class MyhomeComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) { 
    var token = getCookie("jwt");
    var user: any = jwt.decode(token);
    this.http.get(`http://localhost:8001/Myhome/${user.HSE_Id}`)   
    .subscribe(data => {
      LoadHome(data)
      
    }, error => {
      if(error){
      this.router.navigate(['login'])
    }});
    }

  ngOnInit(): void {
   
  }

}
