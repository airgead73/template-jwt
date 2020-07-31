(function expensesDelete() {

  const btnDelete = document.getElementById('btn_delete_many');
  let checkBoxes = document.querySelectorAll('input[name="to_delete"]');

  function init() {
    if(btnDelete && checkBoxes.length) {
      initBtn();
      initCheckBoxes();
    } else {
      return;
    }
  };

  function initBtn() {
    btnDelete.addEventListener('click', function(e) {
      e.preventDefault();
      handleDelete();

    });
  };

  function initCheckBoxes() {
    checkBoxes = Array.from(checkBoxes);

    checkBoxes.forEach(box => {
      box.addEventListener('click', function(e) {
        handleBoxCheck(e);
      });
    });
 
  };

  function handleDelete(e) {
    const boxes = getBoxesChecked();
    const itemIds = [];
    boxes.forEach(box => {

      let itemId = box.id;
      itemId = itemId.split('_');
      itemId = itemId[1];
      itemIds.push(itemId);

    });

    fetchDelete(itemIds);

  };

  function fetchDelete(idsToDelete) {

    const URL = `/api/${btnDelete.getAttribute('data-delete')}/delete_many`;

    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json' 
       },
       body: JSON.stringify({ ids: idsToDelete }) 
    })
    .then(res => res.json())
    .then(res => {
      const { success } = res;
      if(success) {
        window.location.reload(true);
      }
    })
    .catch(err => console.log(err));

  };

  function getBoxesChecked() {
    const boxesChecked = [];
    
    checkBoxes.forEach(box => {
      if(box.checked) {
        boxesChecked.push(box);
      }
    });

    return boxesChecked;

  };

  function handleBoxCheck(e) {

    // Toggle checked row
    let rowId = (e.target).id;
    rowId = rowId.split('_');
    rowId = `row_${rowId[1]}`;

    const row = document.getElementById(rowId);
    row.classList.toggle('active');

    // Toggle delete button
    const checkedBoxes = document.querySelectorAll('input:checked');

    if(checkedBoxes.length) {
      handleBtn('activate');
    } else {
      handleBtn('deactivate');
    }

  };

  function handleBtn(status) {

    const isActive = !btnDelete.disabled

    switch(status) {
      case 'activate':
        if(isActive) {
          return;
        } else {
          btnDelete.disabled = false;
          btnDelete.setAttribute('title', 'Click to delete checked item(s).')
        };
        break;
      case 'deactivate': 
        if(isActive) {
          btnDelete.disabled = true;
          btnDelete.setAttribute('title', 'Select items below for deletion.')
        } else {
          return;
        };
        break;
    }

  };

  // Init script

  init();

})()