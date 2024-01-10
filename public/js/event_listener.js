document.addEventListener("DOMContentLoaded", async function (e) {
  const contactsTable = document.querySelector("table#contacts tbody");
  try {
    const response = await fetch("/contacts");
    const { data } = await response.json();
    const contacts = data;
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-button")) {
      e.preventDefault();
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(`/delete/${e.target.dataset.contact}`, {
              method: "delete",
            });
  
            if (response.status == 200 && response.statusText == "OK") {
              const { message } = await response.json();
  
              Swal.fire({
                title: "Deleted!",
                text: message,
                icon: "success",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/";
                }
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  });
}
    let list = "";

    contacts.forEach((contact, i) => {
      list += `
      <tr>
        <td>${i + 1}</td>
        <td>${contact.name ? contact.name : "-"}</td>
        <td>${contact.email ? contact.email : "-"}</td>
        <td>${contact.phone ? contact.phone : "-"}</td>
      </tr>
    `;
    });

    contactsTable.innerHTML = list;
  } catch (error) {
    console.log(error);
  }
});

deleteButton.addEventListener("click", function (e) {
  e.preventDefault();

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/delete/${this.dataset.contact}`, {
        method: "delete",
      })
        .then((res) => res.text())
        .then((res) => console.log(res));

      // console.log(e);

      // Swal.fire({
      //   title: "Deleted!",
      //   text: "Your file has been deleted.",
      //   icon: "success",
      // });
    }
  });
});
