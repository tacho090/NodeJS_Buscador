const HtmlNode = document.getElementById('datos');
var list_ciudades = [];
var list_tipos = [];
var precioInicial = 0;
var precioFinal = 0;

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  onFinish: function (data) {
    precioInicial = data.from;
    precioFinal = data.to;
    console.log('precioInicial', precioInicial);
    console.log('precioFinal', precioFinal);
  },
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$",
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

$('#buscar').on('click', ()=>{
  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      $.each(data, (i, val)=>{
        HtmlNode.innerHTML = HtmlNode.innerHTML +
        "<div class='card horizontal'>" +
          "<div class='card-image'>" +
            "<img src='img/home.jpg'>" +
          "</div>" +
          "<div class='card-stacked'>"+
            "<div class='card-content'>"+
              "<div>" +
                "<b>Direccion:</b>" + "<p>"+data[i].Direccion+"</p>" +
              "<div>" +
              "<div>" +
                "<b>Ciudad:</b>" + "<p>"+data[i].Ciudad+"</p>" +
              "<div>" +
              "<div>" +
                "<b>Telefono:</b>" + "<p>"+data[i].Telefono+"</p>" +
              "<div>" +
              "<div>" +
                "<b>Codigo Postal:</b>" + "<p>"+data[i].Codigo_Postal+"</p>" +
              "<div>" +
              "<div>" +
                "<b>Precio:</b>" + "<p>"+data[i].Precio+"</p>" +
              "<div>" +
              "<div>" +
                "<b>Tipo:</b>" + "<p>"+data[i].Tipo+"</p>" +
              "<div>" +
            "</div>" +
          "</div>" +
        "</div>"
      });
    },
    error: function(err) {
      console.log(err);
    }
  })

});

function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

$('#ciudad, #tipo').change(function() {
    $('#datos').empty();
    $('#ciudad option:selected').each(()=>{
      $('#tipo option:selected').each(()=>{

      $.ajax({
        url:'/api/data',
        type: 'GET',
        data:{},
        success: function(data){
          $.each(data, (i, val)=>{
            if(data[i].Ciudad === $("#ciudad :selected").text()){
              if(data[i].Tipo === $("#tipo :selected").text()){
              HtmlNode.innerHTML = HtmlNode.innerHTML +
              "<div class='card horizontal'>" +
                "<div class='card-image'>" +
                  "<img src='img/home.jpg'>" +
                "</div>" +
                "<div class='card-stacked'>" +
                  "<div class='card-content'>" +
                    "<div>" +
                      "<b>Direccion:</b>" + "<p>"+data[i].Direccion+"</p>" +
                    "<div>" +
                    "<div>" +
                      "<b>Ciudad:</b>" + "<p>"+data[i].Ciudad+"</p>" +
                    "<div>" +
                    "<div>" +
                      "<b>Telefono:</b>" + "<p>"+data[i].Telefono+"</p>" +
                    "<div>" +
                    "<div>" +
                      "<b>Codigo Postal:</b>" + "<p>"+data[i].Codigo_Postal+"</p>" +
                    "<div>" +
                    "<div>" +
                      "<b>Precio:</b>" + "<p>"+data[i].Precio+"</p>" +
                    "<div>" +
                    "<div>" +
                      "<b>Tipo:</b>" + "<p>"+data[i].Tipo+"</p>" +
                    "<div>" +
                  "</div>" +
                "</div>" +
              "</div>"
            }
          }
        })},
        error: function(err) {
          console.log(err);
        }
      });
    }
  );
});
});

function printJson(){
  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      console.log(data)
    }
  });
}

$("#rangoPrecio").change(function(){
    $('#datos').empty();
    printJson();
    $.ajax({
      url:'/api/data',
      type: 'GET',
      data:{},
      success: function(data){
        $.each(data, (i, val)=>{
          let str = data[i].Precio;
          let new_str = str.replace('$','');
          let new_str01 = new_str.replace(',','');
          console.log('string', new_str01);
          let num = parseInt(new_str01)
          console.log('number', num);
          // console.log(data[i].precio);
          if(num >= precioInicial && num <= precioFinal){
            HtmlNode.innerHTML = HtmlNode.innerHTML +
            "<div class='card horizontal'>" +
              "<div class='card-image'>" +
                "<img src='img/home.jpg'>" +
              "</div>" +
              "<div class='card-stacked'>" +
                "<div class='card-content'>" +
                  "<div>" +
                    "<b>Direccion:</b>" + "<p>"+data[i].Direccion+"</p>" +
                  "<div>" +
                  "<div>" +
                    "<b>Ciudad:</b>" + "<p>"+data[i].Ciudad+"</p>" +
                  "<div>" +
                  "<div>" +
                    "<b>Telefono:</b>" + "<p>"+data[i].Telefono+"</p>" +
                  "<div>" +
                  "<div>" +
                    "<b>Codigo Postal:</b>" + "<p>"+data[i].Codigo_Postal+"</p>" +
                  "<div>" +
                  "<div>" +
                    "<b>Precio:</b>" + "<p>$"+num+"</p>" +
                  "<div>" +
                  "<div>" +
                    "<b>Tipo:</b>" + "<p>"+data[i].Tipo+"</p>" +
                  "<div>" +
                "</div>" +
              "</div>" +
            "</div>"
          }
          })
      },
      error: function(err) {
        console.log(err);
      }
    });
});


$(document).ready(function(){
  let ciudad = $('#ciudad');
  let tipo = $('#tipo');
  let list_ciudades_filter = [];

  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      $.each(data, (i, val)=>{
        list_ciudades.push(data[i].Ciudad);
      });
      list_ciudades = removeDups(list_ciudades);
      $.each(list_ciudades, (i, val)=>{
          ciudad.append("<option value = ''>" + list_ciudades[i] + "</option>");
      });
    },
    error: function(err) {
      console.log(err);
    }
  })

  $.ajax({
    url:'/api/data',
    type: 'GET',
    data:{},
    success: function(data){
      $.each(data, (i, val)=>{
        list_tipos.push(data[i].Tipo);
      });
      list_tipos = removeDups(list_tipos);
      $.each(list_tipos, (i, val)=>{
          tipo.append("<option value = ''>" + list_tipos[i] + "</option>");
      });
    },
    error: function(err) {
      console.log(err);
    }
  })
});

setSearch();
