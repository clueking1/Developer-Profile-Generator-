const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const GitHub = require('github-api')
const pdf = require('html-pdf');




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





.then(async(res) => {
  pdf
const hello =   `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Profile-Generator</title>
  <link rel="stylesheet" type="text/css" href="CSS/style.css">
  <style>
    body {background-color:${res[0].color};
   height:776px;
  }

  html {
    transform: scale(0.67);
  }
    @import url('https://fonts.googleapis.com/css?family=Nunito:400,700,800&display=swap');
    .wholeCard {
        position: relative;
        border: 2px groove grey;
        width: 572px;
        padding: 10px;
       
        background-color: #eaecec;
        font-family: 'Nunito', sans-serif;
        color: #2e3942;
        font-size: .8em;
        /* transform: scale(0.67); */
    }
    
    
    .imgDiv {
      
        width: 79px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    
    .img {
        border-radius: 50%;
        height: 100px;
        width: 100px;
    }
    
    .userDiv {
      
        width: 580px;;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        padding: 10px;
    }
    
    .userHead {
        text-decoration: underline;
    }
    
    .linkDiv {
    
        width: 580px;;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        padding: 10px;
    }
    
    .link1 {
        width: 280px;
        float: left;
    }
    .link2 {
        width: 280px;
        float: left;
    }
    
    .github {
        border: 2px groove grey;
        border-right: none;
        padding: 5px;
        box-shadow: 20px 20px 20px -13px dimgrey;
    }
    
    .blog {
        border: 2px groove grey;
        padding: 5px;
        box-shadow: 20px 20px 20px -13px dimgrey;
    }
    
    .miscDiv {
    
        width: 580px;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        clear: both;
         padding: 10px;
    }
    
     .repoNumDiv{
        width: 140px;
        float: left;
    }
    
     .followersDiv{
        width: 140px;
        float: left;
    }
     .followingDiv{
        width: 140px;
        float: left;
    }
    
     .starDiv{
        width: 140px;
        float: left;
    }
    
    .repoNumHead {
        border: 2px groove grey;
        border-right: none;
        padding: 5px;
           box-shadow: 20px 20px 20px -13px #69696954;
    }
    .folowersHead {
        border: 2px groove grey;
        border-right: none;
        padding: 5px;
           box-shadow: 20px 20px 20px -13px #69696954;
    }
    
    .folowingHead {
        border: 2px groove grey;
        border-right: none;
        padding: 5px;
          box-shadow: 20px 20px 20px -13px #69696954;
    }
    
    .starHead {
        border: 2px groove grey;
    
        padding: 5px;
        box-shadow: 20px 20px 20px -13px #69696954;
    }
    
    .map {
        
        width: 600px;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        clear: both;
        padding: 8px;
         
    }
    .locationHead {
        border: 2px groove grey;
        border-bottom: none;
        width: 550px;
        padding: 5px;
        box-shadow: 20px 20px 20px -13px dimgrey;
    }
    
    .map img {
        border: 2px groove grey;
        box-shadow: 20px 20px 20px -13px dimgrey;
        left:0;
        right: 0;
        margin: -16px auto;
        margin-bottom: 0px;
        margin-right: 36px;
        width: 560px;
    }
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
`
 
  var html = fs.readFileSync('./index.html', 'utf8');
  var options = { format: 'letter' };
  
  pdf.create(hello, options).toFile('./Developer-Profile.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/Developer-Profile.pdf' }
  });

})