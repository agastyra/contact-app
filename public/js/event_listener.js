document.addEventListener("DOMContentLoaded", async function (e) {
  const contactsTable = document.querySelector("table#contacts tbody");
  try {
    const response = await fetch("/contacts");
    const { data } = await response.json();
    const contacts = data;
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
