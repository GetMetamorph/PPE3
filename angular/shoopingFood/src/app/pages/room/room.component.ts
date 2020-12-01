import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import * as jwt from 'jsonwebtoken';
import $ from 'jquery';

var Stock = []
var Room = []
var Products = []
var Total = []

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
function LoadTotal(Room,Total){
  var result = 0
  for (let i = 0; i < Total.length; i++) {
    result += Total[i].TOTAL
  }
  $("#total").append(result + " €")
  $("#room_name").append(Room[0].ROM_Name)
    
}

function LoadRoom(Stock,Products){
  
  for (let i = 0; i < Products.length; i++) {
  
  $("#productstab").append(`
  <tr>
      <td>
          <p id="name_product" class="col-md-6" name="name_product">${Products[i].PDC_Name}</p>
      </td>
      <td>
          <p id="price_product" class="col-md-6" name="price_product">${Products[i].PDC_Price} €</p>
      </td>
      <td><a id="link_product" class="col-md-6" name="link_product" href="${Products[i].PDC_Link}">Détail</a></td>
      <td>
          <p id="qty_product" class="col-md-6" name="qty_product">${Stock[0][i].STK_Qty}</p>
      </td>
  </tr>
  `)
  }
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private http: HttpClient, private router:Router) { 
    var token = getCookie("jwt");
    var user: any = jwt.decode(token);
    var Room_id = new URLSearchParams(window.location.search).get('ROM_Id');

    this.http.get(`http://localhost:8001/room/${Room_id}`)   
    .subscribe(data => {
      Room.push(data)

      this.http.get(`http://localhost:8001/productsRoom/${Room_id}`)   
    .subscribe(data => {
      Stock.push(data);

        for (let i = 0; i < Stock[0].length; i++) {

        this.http.get(`http://localhost:8001/product/${Stock[0][i].PDC_Id}`)   
      .subscribe(data => {
        Products.push(data)

        this.http.get(`http://localhost:8001/ProductTotal/${Stock[0][i].PDC_Id}&${Room_id}`)   
      .subscribe(data => {
        Total.push(data)

        if(i == Stock[0].length-1){LoadRoom(Stock,Products);LoadTotal(Room,Total)}
        
      }, error => {
        if(error){
        this.router.navigate(['login'])
      }});
      }, error => {
        if(error){
        this.router.navigate(['login'])
      }});
      
    }
      }, error => {
        if(error){
        this.router.navigate(['login'])
      }});
    }, error => {
      if(error){
      this.router.navigate(['login'])
    }});
    
  }

  ngOnInit(): void {
  }

}
