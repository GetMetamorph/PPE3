import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import * as jwt from 'jsonwebtoken';
import $ from 'jquery';

var Stock = []
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
function LoadTotal(Stock,Total){
  $("#total").append(Total[0].Total + " €")
  $("#room_name").append(Stock[0].ROM_Name)
    
}

function LoadRoom(Stock){
  for (let i = 0; i < Stock[0].length; i++) {
  
  $("#productstab").append(`
  <tr>
      <td>
          <p id="name_product" class="col-md-6" name="name_product">${Stock[0][i].PDC_Name}</p>
      </td>
      <td>
          <p id="price_product" class="col-md-6" name="price_product">${Stock[0][i].PDC_Price} €</p>
      </td>
      <td><a id="link_product" class="col-md-6" name="link_product" href="${Stock[0][i].PDC_Link}">Détail</a></td>
      <td>
          <input type="number" id="qty_product" class="col-md-6 Qty" name="qty_product" data-index="${Stock[0][i].PDC_Id}" data-room="${Stock[0][i].ROM_Id}" value="${Stock[0][i].STK_Qty}"></input>
      </td>
      <td>
      <button type="button" class="btn btn-danger" id="myBtn-" data-index="${Stock[0][i].PDC_Id}" data-room="${Stock[0][i].ROM_Id}" >Supprimer</button>
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

      this.http.get(`http://localhost:8001/productsRoom/${Room_id}`)   
    .subscribe(data => {
      Stock.push(data);

        this.http.get(`http://localhost:8001/ProductTotal/${Room_id}`)   
      .subscribe(data => {
        Total.push(data)

        LoadRoom(Stock);
        LoadTotal(Stock,Total);
        
        $(".btn-danger").on("click", function() {
          if(confirm("êtes vous sûr de vouloir supprimmer ce produit ?")){
            http.delete(`http://localhost:8001/product/${this.dataset.index}&${this.dataset.room}`)
            .subscribe(() => this.status = 'Delete successful');   
            location.reload()
          }
          event.stopPropagation();
        })

        $(".Qty").on("change", function() {

            http.get(`http://localhost:8001/qty/${$(this).val()}&${this.dataset.index}&${this.dataset.room}`)
            .subscribe(() => this.status = 'successful');   

          event.stopPropagation();
        })

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
