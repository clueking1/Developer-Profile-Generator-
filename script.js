const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const GitHub = require('github-api')



const writeFileAsync = util.promisify(fs.writeFile);

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
    let gh = new GitHub()

    let user = gh.getUser(res.username);
    
    let userInfo = user.getProfile((err, repo) => {repo})
    
    //let numstars = user.listStarredRepos((err, repos) => repos.length())

    return userInfo
})

.then((repos) => {
   
    const htmlInfo = [{
        avatar: repos.data.avatar_url,
        userName: repos.data.login,
        url: repos.data.url,
        blog: repos.data.blog,
        repoNum: repos.data.public_repos,
        followers: repos.data.followers,
        following: repos.data.following,
        location: repos.data.location,
      
    }]
    
    return htmlInfo
})

.then((res) => {
    
    console.log(res)
    const html = `
    <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Profile-Generator</title>
</head>

<body>
  <div class="wholeCard">
      <div class="imgDiv">
        
        <img src="${res.avatar}" class="img">
     
      </div>  
     
      <div class="userDiv">
        
        <h2 class="userHead">Username</h2>
        
        <div class="userName">${res.userName}</div>
     
      </div>  

      <div class="linkDiv">
          <div class="link1">
              
              <h3 class="github">Github</h3>
              
              <div class="gitUrl">${res.url}</div>

          </div>

          <div class="link2">
              
            <h3 class="blog">Blog</h3>
            
            <div class="blogUrl">${res.blog}</div>

          </div>

          <div class="link3">
                
            <h3 class="locationHead">Location</h3>
            
            <div class="location">${res.location}</div>

          </div>
       
      </div>  
      
      <div class="miscDiv">

        <div class="repoNumDiv">
          <h3 class="repoNumHead">Repositories</h3>
          <div class="reponum">${res.repoNum}</div>
        </div>

        <div class="followersDiv">
          <h3 class="folowersHead">Followers</h3>
          <div class="followersnum">${res.followers}</div>
        </div>

        <div class="followingDiv">
          <h3 class="folowingHead">Following</h3>
          <div class="followingnum">${res.following}</div>
        </div>

        <div class="starDiv">
          <h3 class="starHead">Stars</h3>
          <div class="starsnum">16</div>
        </div>
      </div>
        
  </div>
</body>

</html>
`;
     
    return html
   
})

.then((html) => {
    //console.log(html)
    writeFile("index.html", html);
})

