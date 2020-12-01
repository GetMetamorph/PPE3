import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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
                    <a Onclick="window.location.href = '/room?ROM_Id=${room.ROM_Id}'" class="btn btn-primary">Inventaire</a>
                    <button type="button" class="btn btn-danger" id="myBtn-${room.ROM_Id}" data-index="${room.ROM_Id}" >Supprimer</button>
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

      $(".btn-danger").on("click", function() {
        if(confirm("êtes vous sûr de vouloir supprimmer cette pièce ?")){
          http.delete(`http://localhost:8001/room/${this.dataset.index}`)
          .subscribe(() => this.status = 'Delete successful');   
          location.reload()
        }
        event.stopPropagation();
      })
    }, error => {
      if(error){
      this.router.navigate(['login'])
    }});
    
    }

  ngOnInit(): void {

  }
}
