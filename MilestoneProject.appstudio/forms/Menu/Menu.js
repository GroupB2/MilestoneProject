
hmbrMenu2.onclick=function(s){     // when just click the control. 's' is
                                 // the object returned
    if (typeof(s) == "object") { // do nothing
       return
    }
    


switch(s) {
case "loginPage":
    ChangeForm(loginPage)
    break
case "homePage":
    ChangeForm(homePage)
    break
case "watchList":
    ChangeForm(watchList)
    break
case "myProfile":
    ChangeForm(myProfile)
    break
case "logOut":
    ChangeForm(logOut)
    break

}

}

Menu.onshow=function(){
  hmbrMenu2.clear()    // clear out choices before adding ones you want
  hmbrMenu2.addItem("Login")
  hmbrMenu2.addItem("Home")
  hmbrMenu2.addItem("WatchList")
  hmbrMenu2.addItem("Profile")
  hmbrMenu2.addItem("Log Out")
}