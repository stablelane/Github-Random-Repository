import { Octokit } from "https://esm.sh/@octokit/core";
import { key } from "./key.js";
const dropdownHead = document.getElementById('dropdown-head')
const dropdownList = document.getElementById('dropdown-list')
let selectedItem

console.log(key)

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

let languageId = 0
const res = await fetch('https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json')
const data = await res.json()
addListItem(await data)

function addListItem(data) {
    data.forEach(item => {
                dropdownList.innerHTML += `
                    <li id="item-${languageId}">${item.value}  </li>
                `
            }) 
            addEventListenerOnList(Object.values(dropdownList.children))

}


function addEventListenerOnList(arr) {
    
    arr.forEach(item => item.addEventListener('click', selectItem))

} 



dropdownHead.addEventListener('click', showList)




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
