btnSearch3.onclick=function() {
  mediaTitle = inptSearch3.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch3.value = ''
  
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

WriteReview.onshow=function(){
    callAPI(requestURL)
    txtaReview.hidden = True
    hmbrMenu3.clear()    // clear out choices before adding ones you want
    hmbrMenu3.addItem("Login")
    hmbrMenu3.addItem("Home")
    hmbrMenu3.addItem("Watchlist")
    hmbrMenu3.addItem("Profile")
    hmbrMenu3.addItem("Log Out")
    drpRate3.clear() 
    for (i = 0; i < ratings.length; i++)
        drpRate3.addItem(ratings[i])
    query = `SELECT review FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    inptMyReview.value = results[0]
    txtaReview2.value = results[0]
}


hmbrMenu3.onclick=function(s) {
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

drpRate3.onclick=function(s){
  
  if (typeof(s) == "object") {
    return                     
  } 
  else {
        query = `SELECT mr.user_id, mr.media_id FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        if(results.length == 0) {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]
        
            query = `INSERT INTO media_rating (user_id, media_id, rating) VALUES (${user_id}, ${media_id}, '${s}')`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            drpRate.value = s
            drpRate2.value = s
            drpRate3.value = s
        }
        else {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
        
            query = `UPDATE media_rating SET rating = '${s}' WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            drpRate.value = s
            drpRate2.value = s
            drpRate3.value = s
        }
   }
}

lblTitle3.onclick=function(){
  ChangeForm(Search)
}

lblReadReviews.onclick=function(){
  ChangeForm(Review)
}

btnUpdate.onclick=function(){
  txtaReview2.value = inptMyReview.value
}

btnSubmit2.onclick=function(){
    completeReview = inptMyReview.value
    query = `SELECT mr.user_id, mr.media_id FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    if(results.length == 0) {
        
        query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        
        user_id = results[0]
        
        query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        
        media_id = results[0]
        
        query = `INSERT INTO media_rating (user_id, media_id, review) VALUES (${user_id}, ${media_id}, '${completeReview}')`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        txtaReview2.value = 'Your review has been submitted.'
    }
    else {
        
        query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        
        user_id = results[0]
        
        query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        
        media_id = results[0]   
        
        query = `UPDATE media_rating SET review = '${completeReview}' WHERE user_id = ${user_id} AND media_id = ${media_id}`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        query = `UPDATE media_rating SET date = Now() WHERE user_id = ${user_id} AND media_id = ${media_id}`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        txtaReview2.value = 'Your review has been submitted.'
    }
}

btnWatchlist3.onclick=function(){
    if (btnWatchlist.value == 'Add to List') {
        query = `SELECT mr.user_id, mr.media_id FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${currentUser}' `
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
        results = JSON.parse(req.responseText)
        if(results.length == 0) {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]
        
            query = `INSERT INTO media_rating (user_id, media_id, watchlist_status) VALUES (${user_id}, ${media_id}, 'Yes')`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            btnWatchlist.value = 'Remove'
            btnWatchlist2.value = 'Remove'
            btnWatchlist3.value = 'Remove'
        }
        else {
        
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
        
            query = `UPDATE media_rating SET watchlist_status = 'Yes' WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            btnWatchlist.value = 'Remove'
            btnWatchlist2.value = 'Remove'
            btnWatchlist3.value = 'Remove'
        }
    }
    else {
            query = `SELECT user_id FROM user WHERE username = '${currentUser}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            user_id = results[0]
        
            query = `SELECT media_id FROM media WHERE title = '${mediaTitle}'`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            results = JSON.parse(req.responseText)
        
            media_id = results[0]   
        
            query = `UPDATE media_rating SET watchlist_status = 'No' WHERE user_id = ${user_id} AND media_id = ${media_id}`
            req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
            btnWatchlist.value = 'Add to List'
            btnWatchlist2.value = 'Add to List'
            btnWatchlist3.value = 'Add to List'
    }
}
