const deleteButton = document.getElementById('delete_button')
let clickCount = 0
let timer
const orininalText = deleteButton.value

deleteButton.addEventListener('click', (event) => {
    event.preventDefault()

    clickCount++

    if (clickCount === 1) {

    deleteButton.value = "Are You Sure...?"
    
    timer = setTimeout(() => {
        clickCount = 0
        deleteButton.value = orininalText

    }, 3000)

    } else if (clickCount === 2) {
    document.getElementById('delete').submit();
  }
})