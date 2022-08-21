/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"FnrkENoUxnk87GDA","label":"reddit","bookmarks":[{"id":"GsSlrgRUuGksM0VE","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"},{"id":"CY1FnOXZVe4Ovu2w","label":"r/overwatch","url":"https://www.reddit.com/r/overwatch/"},{"id":"5NIAyufHKCgAaelR","label":"r/askreddit","url":"https://www.reddit.com/r/askreddit/"},{"id":"1vvATh7MnS2fHT8z","label":"r/blender","url":"reddit.com/r/blender"}]},{"id":"GGRNvAwOsoQzy2NM","label":"socials","bookmarks":[{"id":"avxFflphsz5W0diy","label":"messenger","url":"messenger.com"},{"id":"za4VwK7CfrylXcx0","label":"twitch.tv","url":"twitch.tv/xqc"},{"id":"XX99tztsMrt2jQIa","label":"reddit","url":"reddit.com"},{"id":"rl8LdZZoggJ0HRFJ","label":"youtube","url":"youtube.com"}]},{"id":"9GL5MWgLhWDRDjDR","label":"sources","bookmarks":[{"id":"gQdztKfUv72hCViX","label":"vids","url":"loader.to"},{"id":"M2rJKZdEhN4dvTpd","label":"textures","url":"https://polyhaven.com/"},{"id":"lWAaQzKtQgf102wQ","label":"github","url":"https://github.com/dotrooe?tab=repositories"},{"id":"EsPNQeJVBeNapKek","label":"drive","url":"https://drive.google.com/drive/u/0/my-drive"}]},{"id":"oGtXhxbAMZx5RyQ4","label":"school","bookmarks":[{"id":"CK0zZvfC75e5bor1","label":"w3schools","url":"https://www.w3schools.com/"},{"id":"XWI7ggygB7ECgsxw","label":"wolfram","url":"https://www.wolframalpha.com/"},{"id":"DpDtUHOnQmj2oL3L","label":"odrabiamy","url":"https://odrabiamy.pl/moje"},{"id":"c9MOHizox6ocr5WR","label":"karta wzorów","url":"https://cke.gov.pl/images/_EGZAMIN_MATURALNY_OD_2015/Informatory/2015/MATURA_2015_Wybrane_wzory_matematyczne.pdf"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
