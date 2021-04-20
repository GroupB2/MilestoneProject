btnSearch4.onclick=function() {
  mediaTitle = inptSearch4.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch4.value = ''
  
  drpRate.value = 'Rate'
  drpRate2.value = 'Rate'
  drpRate3.value = 'Rate'
  
    query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if (results[0] != '' && results.length == 1) {
        drpRate.value = results[0]
        drpRate2.value = results[0]
        drpRate3.value = results[0]
    }
  
   ChangeForm(Search)
}

Watchlist.onshow=function(){
    callAPI(requestURL)
    btnRemove.hidden = True
    hmbrMenu4.clear()    // clear out choices before adding ones you want
    hmbrMenu4.addItem("Login")
    hmbrMenu4.addItem("Home")
    hmbrMenu4.addItem("Watchlist")
    hmbrMenu4.addItem("Profile")
    hmbrMenu4.addItem("Log Out")
    selWatchlist.clear()
    query = `SELECT m.title, m.avg_score FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND mr.watchlist_status = 'Yes' ORDER BY m.title`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Score: ' + results[i][1]
        selWatchlist.addItem(item)
    }
}

hmbrMenu4.onclick=function(s) {
    if (typeof(s) == "object") {
       return
    }
    switch(s) {
        case "loginPage":
            ChangeForm(loginPage)
            break
        case "homePage":
            ChangeForm(homePage)
            break
        case "Watchlist":
            ChangeForm(Watchlist)
            break
        case "myProfile":
            ChangeForm(myProfile)
            break
        case "logOut":
            ChangeForm(logOut)
            break

    }
}

btnRemove.onclick=function(){
    if (selWatchlist.text != 'This movie is not in your watchlist.') {
        query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        
        user_id = results[0]
    
        let placeholder = selWatchlist.text
        let watchlistMedia = ''
        for (i = 0; placeholder[i] + placeholder[i+1] != ' |'; i ++) {
            watchlistMedia = watchlistMedia + placeholder[i]
        }
        mediaTitle = watchlistMedia
        
        query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
        console.log(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        
        media_id = results[0]   
        
        query = `UPDATE media_rating SET watchlist_status = 'No' WHERE user_id = ${user_id} AND media_id = ${media_id}`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    
        btnRemove.hidden = True
        selWatchlist.clear()
    
        query = `SELECT m.title, m.avg_score FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND mr.watchlist_status = 'Yes' ORDER BY m.title`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        for (i = 0; i < results.length; i++) {
            item = results[i][0] + ' | Score: ' + results[i][1]
            selWatchlist.addItem(item)
        }
    }
}

btnSubmit3.onclick=function(){
    if (inptWatchlistMedia.value != '') {
        selWatchlist.clear()
        let searchName = inptWatchlistMedia.value
        query = `SELECT m.title, m.avg_score FROM media_rating mr INNER JOIN user u ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE title = '${searchName}' AND mr.watchlist_status = 'Yes'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        console.log(results)
        if(results[0] != '' && results.length == 0) {
            item = 'This movie is not in your watchlist.'
            selWatchlist.addItem(item)
        }
        else {
            item = results[0][0] + ' | Score: ' + results[0][1]
            selWatchlist.addItem(item)
        }
        inptWatchlistMedia.value = ''
    }
    else {
        btnSubmit3.value = 'Search List'
        if (selWatchlist.text != 'This movie is not in your watchlist.') {
            let placeholder = selWatchlist.text
            let watchlistMedia = ''
            for (i = 0; placeholder[i] + placeholder[i+1] != ' |'; i ++) {
                watchlistMedia = watchlistMedia + placeholder[i]
            }
            mediaTitle = watchlistMedia
            requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
            callAPI(requestURL)
  
            drpRate.value = 'Rate'
            drpRate2.value = 'Rate'
            drpRate3.value = 'Rate'
  
            query = `SELECT rating FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
            if (results[0] != '' && results.length == 1) {
                drpRate.value = results[0]
                drpRate2.value = results[0]
                drpRate3.value = results[0]
            }
            ChangeForm(Search)
        }
    }
}

selWatchlist.onclick=function(){
    if (selWatchlist.text != 'This movie is not in your watchlist.') {
        btnSubmit3.value = 'Go to Page'
        btnRemove.hidden = False
    }
}

inptWatchlistMedia.onclick=function(){
  btnSubmit3.value = 'Search List'
  btnRemove.hidden = True
}

lblReset2.onclick=function(){
    selWatchlist.clear()
    query = `SELECT m.title, m.avg_score FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE u.username = '${currentUser}' AND mr.watchlist_status = 'Yes' ORDER BY m.title`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' | Score: ' + results[i][1]
        selWatchlist.addItem(item)
    }
}
