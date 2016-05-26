var openMenu = document.getElementById("openMenu");

var navDrawer = document.getElementById("navDrawer");
var header = document.getElementById("header");
var main = document.getElementById("mainContent");

/* Menu animation open/close */

openMenu.onclick = function(){
	if (openMenu.getAttribute('data-open') == 'true') {
		openMenu.setAttribute('data-open', 'false');
		navDrawer.style.left= "-300px";
		header.style.width = "100%";
		main.style.width = "100%";
	} else if (openMenu.getAttribute('data-open') == 'false') {
		openMenu.setAttribute('data-open', 'true');
		navDrawer.style.left= "0";
		header.style.width = "calc(100% - 300px)";
		main.style.width = "calc(100% - 300px)";
	}
}

/* Menu link handler */

var home = document.getElementById("home");
var music = document.getElementById("music");
var settings = document.getElementById("settings");
var senaris = document.getElementById("senaris");

home.onclick = function() {console.log("HOME");$("#mainContent").load("pages/home/home.html");}
music.onclick = function() {$("#mainContent").load("pages/music/music.html");}
settings.onclick = function() {$("#mainContent").load("pages/settings/settings.html");}
senaris.onclick = function() {$("#mainContent").load("pages/senari/senari.html");}
tvShow.onclick = function() {$("#mainContent").load("pages/tvShow/tvShow.html");}