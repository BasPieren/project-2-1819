(() => {

  function articleLoadIn() {
    const article = document.querySelectorAll('article')

    article.forEach((e, index) => {
      setTimeout(() => {
        e.className = 'p2-article-load-in'
      }, 400 * (index + 1))
    })
  }

  articleLoadIn()

})()
