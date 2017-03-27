(() => {
  const removeButton = document.querySelectorAll('.remove-recipe')
  const editButton = document.querySelectorAll('.edit-recipe')
  const editId = document.getElementById('edit-form-id')
  const editName = document.getElementById('edit-form-name')
  const editIng = document.getElementById('edit-form-ingredients')
  const editDir = document.getElementById('edit-form-directions')

  const removeRecipie = (e) => {
    if (e.target.dataset.id) {
      const id = e.target.getAttribute('data-id')
      let go = window.confirm('Do you want to del?')
      if (go) {
        $.ajax({
          url: '/delete/' + id,
          type: 'DELETE',
          success(result) {
            console.log('Deleting Recipe...', result)
            window.location.href = '/'
          },
          error(err) {
            console.log(err)
          }
        })
      }
    }
  }

  const editRecipie = (e) => {
    if (e.target.dataset.id) {
      editId.value = e.target.getAttribute('data-id')
      editName.value = e.target.getAttribute('data-name')
      editIng.value = e.target.getAttribute('data-ingredients')
      editDir.value = e.target.getAttribute('data-directions')
    }
  }
  removeButton.forEach(btn => {
    btn.addEventListener('click', removeRecipie)
  })
  editButton.forEach(btn => {
    btn.addEventListener('click', editRecipie)
  })
})()