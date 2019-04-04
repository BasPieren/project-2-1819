(() => {

  function articleLoadIn() {
    const article = document.querySelectorAll('article')

    article.forEach(e => {
      e.className = 'p2-opacity-0'
    })

    article.forEach((e, index) => {
      setTimeout(() => {
        e.classList.add('p2-article-load-in')
      }, 400 * (index + 1))
    })
  }

  articleLoadIn()

})()
