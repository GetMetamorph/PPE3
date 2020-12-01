import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import * as jwt from 'jsonwebtoken';
import $ from 'jquery';


var Stock = []
var HouseRoom = []

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

function LoadProducts( Stock, HouseRoom) {
  console.log(Stock)
  $("#productstab").empty()
  for (let i = 0; i < Stock[0].length; i++) {
    $("#productstab").append(`
    <tr>
        <td>
            <div class="form-control col-md-6" id="name_product" name="name_product">${Stock[0][i].PDC_Name}</div>
        </td>
        <td>
            <div class="form-control col-md-6" id="desc_product" name="desc_product">${Stock[0][i].PDC_Description}</div>
        </td>
        <td><a id="link_product" class="col-md-6" name="link_product" href="${Stock[0][i].PDC_Link}">Détail</a></td>
        <td>
            <div class="form-control col-md-6" id="price_product" name="price_product">${Stock[0][i].PDC_Price}</div>
        </td>
        <td>
            <div class="form-control col-md-6" id="qty_product" name="qty_product">${Stock[0][i].STK_Qty}</div>
        </td>
        <td>
            <div id="room" name="room" class="form-control">${Stock[0][i].ROM_Name}</div>
        </td>
    </tr>
    
    `)
  };
  $("#productstab").append(`
  <tr>
  <td><input type="text" class="form-control col-md-6" id="PDC_Name" name="PDC_Name"></td>
  <td><input type="text" class="form-control col-md-6" id="PDC_Description" name="PDC_Description"></td>
  <td><input type="text" class="form-control col-md-6" id="PDC_Link" name="PDC_Link"></td>
  <td><input type="number" class="form-control col-md-6" id="PDC_Price" name="PDC_Price"></td>
  <td><input type="number" class="form-control col-md-6" id="STK_Qty" name="STK_Qty"></td>
  <td><select id="roomlist" name="room" class="form-control">
  
</select></td>

  </tr>
    `)

  HouseRoom[0].forEach(room => {
  $("#roomlist").append(`
    <option>${room.ROM_Name}</option>
    `)
});
    
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  //A Changer avec Switch map et Forkjoin 

  constructor(private http: HttpClient, private router:Router) { 
    var token = getCookie("jwt");
    var user: any = jwt.decode(token);

    this.http.get(`http://localhost:8001/products/${user.HSE_Id}`)   
    .subscribe(data => {
      console.log(data)
      Stock.push(data);
      
      this.http.get(`http://localhost:8001/Myhome/${user.HSE_Id}`)   
      .subscribe(data => {
        HouseRoom.push(data)
        LoadProducts( Stock, HouseRoom)

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