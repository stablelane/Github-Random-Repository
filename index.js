import { Octokit } from "https://esm.sh/@octokit/core";
import { key } from "./key.js";
console.log(key)
const dropdownHead = document.getElementById('dropdown-head')
const dropdownList = document.getElementById('dropdown-list')
let selectedItem

dropdownHead.addEventListener('click', showList)

const itemArr = Object.values(dropdownList.children)
itemArr.forEach(item => item.addEventListener('click', selectItem))


function selectItem(e) {

    if (selectedItem) {
        selectedItem.classList.remove('show-icon')
    }
    dropdownHead.innerHTML = `<p>${this.innerText}</p>
                                    <p>⌄</p>`

    showList()
    selectedItem = this.children[0]
    selectedItem.classList.add('show-icon')
}

function showList() {
    dropdownList.classList.toggle('show-list')
}
// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
    auth: key
})

await octokit.request('GET /search/repositories?q=tetris+language:assembly&sort=stars&order=desc', {
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
})
.then(octokit => console.log(octokit))
let languageId = 0
fetch('https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json')
    .then(res => res.json())
    .then(data => {
        data.splice(1,10).forEach(item => {
            dropdownList.innerHTML += `
                <li id="item-${languageId}">${item.value}  </li>
            `
        })
    })