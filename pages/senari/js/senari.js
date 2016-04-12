// INIT HEADER
$("#menuPath").html('<a href="#!" class="breadcrumb">Accueil</a><a href="#!" class="breadcrumb">Senari</a>');

// SORTABLE
$( "#systemList, #whenList" ).sortable({
    connectWith: ".connectedSortable",
    placeholder: "ui-state-highlight",
    forcePlaceholderSize: true,
    cancel: ".disable",
    receive: function(event, ui) {
      var hasclass = $(ui.item).hasClass("whenItem");
      
      $($(ui.item).find('input')).focus();
      $(ui.item.children('input')).focus();
      
      if (ui.item.closest('ul').attr('id') == "systemList")
        return;
      if ($(this).children().length > 2)
          $(ui.sender).sortable('cancel');
      
      if (hasclass == false){
        $(ui.sender).sortable('cancel');
      }

      },
    over: function( event, ui ) {
        this.style.background = "#DDDDDD";
    },
    out: function(event, ui) {
        this.style.background = "#FFFFFF";
    }
  }).disableSelection();

$( "#systemList, #andList" ).sortable({
    connectWith: ".connectedSortable",
    placeholder: "ui-state-highlight",
    forcePlaceholderSize: true,
    cancel: ".disable",
    receive: function(event, ui) {
      var hasclass = $(ui.item).hasClass("andItem");

      $($(ui.item).find('input')).focus();
      $(ui.item.children('input')).focus();
      if (ui.item.closest('ul').attr('id') == "systemList")
        return;
      if ($(this).children().length > 2)
          $(ui.sender).sortable('cancel');
      if (hasclass == false){
        $(ui.sender).sortable('cancel');
      }
      },
    over: function( event, ui ) {
        this.style.background = "#DDDDDD";
    },
    out: function(event, ui) {
        this.style.background = "#FFFFFF";
    }

  }).disableSelection();

$( "#systemList, #thenList" ).sortable({
    connectWith: ".connectedSortable",
    placeholder: "ui-state-highlight",
    forcePlaceholderSize: true,
    cancel: ".disable",
    receive: function(event, ui) {
      var hasclass = $(ui.item).hasClass("thenItem");

      $($(ui.item).find('input')).focus();
      $(ui.item.children('input')).focus();
      if (ui.item.closest('ul').attr('id') == "systemList")
        return;

      if (hasclass == false){
        $(ui.sender).sortable('cancel');
      }
    },
    over: function( event, ui ) {
        this.style.background = "#DDDDDD";
    },
    out: function(event, ui) {
        this.style.background = "#FFFFFF";
    }
  }).disableSelection();

// CORRECT BAD HANDELING OF INPUT CLICK EVENT
$("#systemList input").bind('click.sortable mousedown.sortable',function(ev){
  ev.target.focus();
});

// INIT DATEPICKER
$('.datepicker').pickadate({
  selectMonths: true, // Creates a dropdown to control month
  selectYears: 15 // Creates a dropdown of 15 years to control year
});

// INIT PARAMS BOT LEFT
$("#reload").click(function(){
//  $("#mainContent").load("pages/senari/senari.html");
  $("#mainContent").load("/admin/custom/pages/senari/senari.html");
})

// INIT DROPDOWNS
$('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on hover
    gutter: 0, // Spacing from edge
    belowOrigin: false, // Displays dropdown below the button
    alignment: 'left' // Displays dropdown with edge aligned to the left of button
  }
);

// INIT SONG LIST
$.get("http://localhost:3000/songsForWeb", function(data) {
    var data = JSON.parse(data);
    var html = "";
    for(author in data) {
      html += '<p>'+author+'</p>';
      for (i=0; i< data[author].length; i++) {
        html += ' <li><a class="songItem">'+data[author][i]+'</a></li>';
      }
    }
    $("#dropdownSong").append(html);
    $(".songItem").click(function(){
      this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('span')[0].innerText = this.innerText;
    })
  });

      

//////////////////
// SENARI BUILDER


function getSenario() {
  // WHEN
  var whenItem = $("#whenList .whenItem")[0];
  var whenType = whenItem.getAttribute("data-type");
  switch(whenType) {
    case "mail":
      var sender = $(whenItem).find(".more input").val();
      console.log("thats a mail! mail from: "+sender);
      break;
    case "keyword":
      var keyword = $(whenItem).find(".more input").val();
      console.log("thats a keyword! keyword: "+keyword);
      break;
    case "nfc":
      var nfc = $(whenItem).find(".more input").val();
      console.log("thats a NFC! nfc content: "+nfc);
      break;
    case "tvshow":
      console.log("thats a tvShow!");
      break; 
    default :
      console.log("i need to add a case to this new item!");
      break;
  }


  // AND
  var andItem = $("#andList .andItem")[0];
  var andType = andItem.getAttribute("data-type");
  switch(andType) {
    case "light":
      console.log("thats a light! //do more after")
      //do what i want
      break;
    case "date":
      var date = new Date($(andItem).find(".more input").val());
      console.log("thats a Date! date : "+date);
      break;
    default :
      console.log("i need to add a case to this new item!");
      break;
  }


  // THEN  // NOT SWITCH CASE HERE, NEED TO HAVE MORE THAN ONCE
  var thenItem = $("#thenList .thenItem")[0];
  var thenType = thenItem.getAttribute("data-type");
  switch(thenType) {
    case "light":
      console.log("thats a light! //do more after")
      //do what i want
      break;
    case "say":
      var phrase = $(thenItem).find(".more input").val();
      console.log("let's speech! phrase : "+phrase);
      break;
    case "song":
      var song = $(thenItem).find("span").text();
      console.log("let's play a song! song : "+song);
      break;
    default :
      console.log("i need to add a case to this new item!");
      break;
  }

}

// WHEN

