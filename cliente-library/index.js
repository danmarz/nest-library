const lista = document.querySelector('.lista')

const loadBooks = async () => {
  try {
    let response = await fetch('http://localhost:3000/api/v1/book')
    let datos = await response.json()
    datos.map((element) => {
      const li = document.createElement('li')
      li.textContent = element.title
      lista.appendChild(li)
    })
  } catch (error) {
    console.error(error.message)
  }
}

window.onload = loadBooks
