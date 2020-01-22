const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const GitHub = require('github-api')


var color 


inquirer
.prompt([
      {
        type: "input",
        name: "color",
        message: "What is your favorite color?"
      },
      {
        type: "input",
        name: "username",
        message: "What is your Github Username?"
      },
])

.then((res) => {
    
    const gh = new GitHub()
    let color = res.color
    let user = gh.getUser(res.username);

    return [user, color]

  })

.then( async(user) => {
    //console.log(user[0])
    let userInfo = await user[0].getProfile((err, repo) => repo)
    
    const callback = [user, userInfo.data]
    
    return callback

  })

.then(async(user) => {
  
  let starnum

    await user[0][0].listStarredRepos((err, repo) => {
              starnum = repo.length 
    })
    
    const callback2 = [user, starnum]
    
    return callback2
     

  })





.then((repos) => {
    console.log(repos)
    const htmlInfo = [{
        avatar: repos[0][1].avatar_url,
        userName: repos[0][1].login,
        url: repos[0][1].url,
        blog: repos[0][1].blog,
        repoNum: repos[0][1].public_repos,
        followers: repos[0][1].followers,
        following: repos[0][1].following,
        location: repos[0][1].location,
        stars: repos[1],
        color: repos[0][0][1]
    }]
    
    return htmlInfo

  })



.then((res) => {
    
  
    const html = `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Profile-Generator</title>
  <link rel="stylesheet" type="text/css" href="CSS/style.css">
  <style>
    body {background-color:${res[0].color}}

  </style>
</head>

<body>
  <div class="wholeCard">
      <div class="imgDiv">
        
        <img src="${res[0].avatar}" class="img" height="200" width="200">
     
      </div>  
     
      <div class="userDiv">
        
        <h2 class="userHead">Username</h2>
        
        <div class="userName">${res[0].userName}</div>
     
      </div>  

      <div class="linkDiv">
          <div class="link1">
              
              <h3 class="github">Github</h3>
              
              <div class="gitUrl">${res[0].url}</div>

          </div>

          <div class="link2">
              
            <h3 class="blog">Blog</h3>
            
            <div class="blogUrl">${res[0].blog}</div>

          </div>

       </div>  
      
      <div class="miscDiv">

        <div class="repoNumDiv">
          <h3 class="repoNumHead">Repositories</h3>
          <div class="reponum">${res[0].repoNum}</div>
        </div>

        <div class="followersDiv">
          <h3 class="folowersHead">Followers</h3>
          <div class="followersnum">${res[0].followers}</div>
        </div>

        <div class="followingDiv">
          <h3 class="folowingHead">Following</h3>
          <div class="followingnum">${res[0].following}</div>
        </div>

        <div class="starDiv">
          <h3 class="starHead">Stars</h3>
          <div class="starsnum">${res[0].stars}</div>
        </div>
      </div>
        
      <div class="map">
                
      <h3 class="locationHead">Location</h3>
      
      <div>
          <img src="https://maps.googleapis.com/maps/api/staticmap?center=${res[0].location}&zoom=14&size=600x200&key=AIzaSyDIEVzD85LZ_BWwmWAD2qPxTiUNGgA28YI" align="middle">
      </div>

    </div>
  </div>
</body>

</html>
`;
     
    return html
   
  })

.then((html) => {
  
    fs.writeFile("index.html", html, function(err) {

        if (err) {
          return err;
        }
      
        console.log("Success!");
      
      });
    })

