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
    user.getProfile((err, repo) => {
        console.log(repo.avatar_url)
        console.log(repo.login)
        console.log(repo.url)
        console.log(repo.blog)
        console.log(repo.public_repos)
        console.log(repo.followers)
        console.log(repo.following)
        console.log(repo.location)
    })

    user.listStarredRepos((err, repo) => {
    console.log(repo.length)
    })
})

.then((res) => {
    console.log(res)
})
