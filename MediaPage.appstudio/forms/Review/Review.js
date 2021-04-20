btnSearch2.onclick=function() {
  mediaTitle = inptSearch2.value
  requestURL = "http://www.omdbapi.com/?t=" + mediaTitle + "&apikey=2c27ce9a"
  callAPI(requestURL)
  inptSearch2.value = ''
  
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

Review.onshow=function(){
    callAPI(requestURL)
    txtaReview.hidden = True
    btnReviewerProfile.hidden = True
    hmbrMenu2.clear()    // clear out choices before adding ones you want
    hmbrMenu2.addItem("Login")
    hmbrMenu2.addItem("Home")
    hmbrMenu2.addItem("Watchlist")
    hmbrMenu2.addItem("Profile")
    hmbrMenu2.addItem("Log Out")
    drpRate2.clear() 
    for (i = 0; i < ratings.length; i++)
        drpRate2.addItem(ratings[i])
    selNames.clear()
    selNames.hidden = False
    let item = ''
    query = `SELECT username, date FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND mr.review IS NOT NULL ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + '\n - ' + results[i][1]
        selNames.addItem(item)
    }
}


hmbrMenu2.onclick=function(s) {
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

drpRate2.onclick=function(s){
  
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

lblTitle2.onclick=function(){
  ChangeForm(Search)
}

btnSubmit.onclick=function(){
  if (inptUserReview.value != '') {
    txtaReview.hidden = True
    selNames.hidden = False
    selNames.clear()
    let un = inptUserReview.value
    query = `SELECT username, date FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${un}' ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + ' - ' + results[i][1]
        selNames.addItem(item)
    }
    inptUserReview.value = ''
    btnSubmit.value = 'Submit'
  }
else {
    btnSubmit.value = 'Search'
    let placeholder = selNames.text
    let usernameReview = ''
    let selectedReview = ''
    for (i = 0; placeholder[i] != ' '; i ++) {
        usernameReview = usernameReview + placeholder[i]
    }
    query = `SELECT review FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' AND u.username = '${usernameReview}'`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        selectedReview = results[i]
    }
    selNames.hidden = True
    txtaReview.hidden = False
    btnReviewerProfile.hidden = False
    if (selectedReview == '')
        txtaReview.value = 'You have not selected a user review to view.'
    else {
        txtaReview.value = `${usernameReview}'s Review:\n${selectedReview}`
    }
  }
    
}

lblWriteReview.onclick=function(){
  ChangeForm(WriteReview)
}

selNames.onclick=function(){
   btnSubmit.value = 'Submit'
}

lblReset.onclick=function(){
    selNames.clear()
    selNames.hidden = False
    txtaReview.hidden = True
    let item = ''
    query = `SELECT username, date FROM user u INNER JOIN media_rating mr ON u.user_id = mr.user_id INNER JOIN media m ON mr.media_id = m.media_id WHERE m.title = '${mediaTitle}' ORDER BY date DESC`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=375groupb2&query=" + query)
    results = JSON.parse(req.responseText)
    for (i = 0; i < results.length; i++) {
        item = results[i][0] + '\n - ' + results[i][1]
        selNames.addItem(item)
    }
    lblReset = ''
}

btnWatchlist2.onclick=function(){
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

btnReviewerProfile.onclick=function(){
  ChangeForm(friendProfile)
}
