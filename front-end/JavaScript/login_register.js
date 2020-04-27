reg_section = document.getElementById("register");
log_secrion = document.getElementById("log-in");
reg_button = document.getElementById("login_button");
log_button  = document.getElementById("register_button");

if(window.location.href.indexOf("login.html#login_section") != -1){
    hide_tab(log_secrion, reg_section);
    reg_button.classList.add("active_switch_button");
    log_button.classList.remove("active_switch_button");
}else{
    hide_tab(reg_section, log_secrion);
    log_button.classList.add("active_switch_button");
    reg_button.classList.remove("active_switch_button");
}

reg_button.onclick = function () {
    hide_tab(log_secrion, reg_section);
    this.classList.add("active_switch_button");
    log_button.classList.remove("active_switch_button");
}

log_button.onclick = function () {
    hide_tab(reg_section, log_secrion);
    this.classList.add("active_switch_button");
    reg_button.classList.remove("active_switch_button");
}

function hide_tab(show_section, hide_section) {
    show_section.style.display = "block";
    hide_section.style.display = "none";
}