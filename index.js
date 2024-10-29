import { Octokit } from "https://esm.sh/@octokit/core";
import { key } from "./key.js";
const dropdownHead = document.getElementById('dropdown-head')
const dropdownList = document.getElementById('dropdown-list')
const refreshBtn = document.getElementById('refresh-btn')
refreshBtn.addEventListener('click', () => {
    getRandomRepo(dropdownHead.firstChild.innerText)
    document.getElementById('repo-visible').style.display = 'none'
    document.getElementById('placeholder-card').style.display = 'block'
})
dropdownHead.addEventListener('click', showList)

console.log(key)

// Octokit.js
// https://github.com/octokit/core.js#readme
async function getRandomRepo(languageName) {
    try {
        const octokit = new Octokit({
            auth: key
        })
        await octokit.request(`GET /search/repositories?q=language:${languageName}&sort=stars&order=desc`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
            .then(data => {
                displayRepo(data.data.items[Math.round(Math.random() * 30)], languageName)
                document.getElementById('placeholder-card').style.display = 'none'
                document.getElementById('repo-visible').style.display = 'block'
                refreshBtn.textContent = 'Refresh'
                refreshBtn.style.backgroundColor = 'black'
                document.getElementById('repo-card').style.backgroundColor = '#fff'
            })
    }
    catch {
        document.getElementById('repo-visible').style.display = 'block'
        document.getElementById('placeholder-card').style.display = 'none'
        refreshBtn.textContent = 'Click to Retry'
        refreshBtn.style.backgroundColor = 'red'
        document.getElementById('repo-card').style.backgroundColor = '#ddbbbb'
        document.getElementById('repo-card').textContent = "Error Fetching repositories"
    }

}

console.log()
let languageId = 0
const res = await fetch('https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json')
const data = await res.json()
addListItem(await data)

function addListItem(data) {
    data.forEach(item => {
        dropdownList.innerHTML += `
        <li id="item-${languageId}">${item.value}<img class="tick-icon" src="icon/checked.png" alt=""></li>
        `
    })
    addEventListenerOnList(Object.values(dropdownList.children))

}


function addEventListenerOnList(arr) {

    arr.forEach(item => item.addEventListener('click', selectItem))

}

let selectedItem
function selectItem(e) {
    if (selectedItem) {
        selectedItem.classList.remove('show-icon')
    }
    dropdownHead.innerHTML = `<p>${this.innerText}</p>
                                    <p>⌄</p>`

    showList()
    selectedItem = this.children[0]
    selectedItem.classList.add('show-icon')
    getRandomRepo(this.innerText)
    document.getElementById('repo-visible').style.display = 'none'
    document.getElementById('placeholder-card').style.display = 'block'
    document.getElementById('placeholder-card').textContent = 'Loading, Please wait..'
}

function showList() {
    dropdownList.classList.toggle('show-list')
}
function displayRepo(data, languageName) {
    console.log(data.html_url)
    document.getElementById('repo-card').innerHTML = `
                <a href="${data.html_url}" target="_blank" class="repo">
                    <p class="repo-name">${data.name}</p>
                    <p class="repo-details">${data.description}</p>
                    <div class="repo-stats">
                        <div class="lang">
                            <img src="icon/yellow-circle.svg" alt="">
                            <p class="lang-name">${languageName}</p>
                        </div>
                        <div class="star">
                            <img src="icon/star-sharp.svg" alt="">
                            <p class="star-count">${data.stargazers_count}</p>
                        </div>
                        <div class="fork">
                            <img src="icon/git-fork.svg" alt="">
                            <p class="fork-count">${data.forks}</p>
                        </div>
                        <div class="issue">
                            <img src="icon/issue-opened.svg" alt="">
                            <p class="issue-count">${data.open_issues}</p>
                        </div>
                    </div>
                </a>
    `
}