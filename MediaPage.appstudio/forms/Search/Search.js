let mediaTitle = 'Finding Nemo'
let requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"

function onXHRLoad() {
    let message = ""
    let apiData = JSON.parse(this.responseText)
    
    lblTitle.value = "Error: Movie doesn't exist."

    lblTitle.value = apiData.Title
    
    lblRating.value = "Score: " + apiData.imdbRating
    
    message = message + "Release Date: "+ apiData.Released + "\n"
    message = message + "\nRuntime: " + apiData.Runtime + "\n"
    message = message + "\nGenre: " + apiData.Genre + "\n"
    message = message + "\nDirector: " + apiData.Director + "\n"
    message = message + "\nActors: " + apiData.Actors + "\n"
    message = message + "\nPlot: " + apiData.Plot
    
    txtaMedia.value = message
    
    imgPoster.src = apiData.Poster
}

function callAPI(requestURL) {
    var xhttp = new XMLHttpRequest();
    
    // if you need cors (you'll get a cors error if you don't have it and you need it)
    // use this code to add the cors code to your url 
    xhttp.open('GET', 'https://cors.bridged.cc/' + requestURL)
    
    // if you DON'T need cors use this code:
    //xhttp.open('GET',URL)
    
    /* Headers */
    // if you need to set the returned data type, use this line of code: 
    //xhttp.setRequestHeader('Content-Type', 'application/json')
    
    // if you need authorization token (stored in myToken) use this line of code: 
    // xhttp.setRequestHeader('Authorization', 'Bearer ' + myToken)
    
    // if you need a key and it's not in the url use code in one of the following
    // examples (think of headers as parameters)
    // or just use the Postman url which has all the parameters already added like I did here. 
    
    
    // Here are headers you might need: 

    // make the API request
    xhttp.addEventListener('load', onXHRLoad)
    xhttp.send()
}

btnSearch.onclick=function(){
  mediaTitle = inptSearch.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch.value = ''
}

Search.onshow=function(){
    callAPI(requestURL)
    hmbrMenu2.clear()    // clear out choices before adding ones you want
    hmbrMenu2.addItem("Login")
    hmbrMenu2.addItem("Home")
    hmbrMenu2.addItem("WatchList")
    hmbrMenu2.addItem("Profile")
    hmbrMenu2.addItem("Log Out")
}


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
