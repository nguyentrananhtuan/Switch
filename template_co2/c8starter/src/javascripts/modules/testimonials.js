function myFunction() {
    var x = document.getElementById("showmenu");
    if (x.className === "showmenu") {
        x.className += " show";
    } else {
        x.className = "showmenu";
    }
}