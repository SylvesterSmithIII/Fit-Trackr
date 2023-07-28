const workouts = document.querySelectorAll('.workout_child')

workouts.forEach(workout => {
    workout.addEventListener('click', () => {
        const checkbox = document.getElementById(workout.id)
        if (checkbox.checked === false) {
            workout.classList.add('active')
            checkbox.checked = true
        } else {
            workout.classList.remove('active')
            checkbox.checked = false
        }
    } )
})

const form = document.getElementById('form')
const checkboxes = document.querySelectorAll('input[type="checkbox"]')

form.addEventListener('submit', function(event) {
let isAtLeastOneChecked = false

checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
    isAtLeastOneChecked = true
    }
});

if (!isAtLeastOneChecked) {
    // to stop form from submittin
    event.preventDefault()
    alert('Please select at least one checkbox before submitting.')
}
});