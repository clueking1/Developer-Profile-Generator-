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
    var gh = new GitHub()
    let user = gh.getUser(res.username);
    let userInfo = user.getProfile((err, repo) => {repo})
     return userInfo
 

})


.then((repos) => {
  
    const htmlInfo = new Array()
        htmlInfo['avatar'] = repos.data.avatar_url
        htmlInfo['url'] = repos.data.url
        htmlInfo['info'] = repos.data.blog
        htmlInfo['repoNum'] = repos.data.public_repos
        htmlInfo['followers'] = repos.data.followers
        htmlInfo['following'] = repos.data.following
        htmlInfo['location'] = repos.data.location
      
    
    return htmlInfo
})

.then((res) => {
     //console.log(res.repoNum)
     console.log(res)
})