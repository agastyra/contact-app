if (window.location.pathname == "/") {
  document.addEventListener("DOMContentLoaded", async function (e) {
    const contactList = document.querySelector(".contact-list");
    try {
      const response = await fetch("/contacts");
      const { data } = await response.json();
      const contacts = data;
      const list = EachContact(contacts);
      contactList.innerHTML = TableContact(list, contacts);
    } catch (error) {
      console.log(error);
    }
  });

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
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `/delete/${e.target.dataset.contact}`,
              {
                method: "delete",
              }
            );

            if (response.status == 200 && response.statusText == "OK") {
              const { message } = await response.json();

              Swal.fire({
                title: "Deleted!",
                text: message,
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
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

function TableContact(list = "", contacts = []) {
  return `<table class="table" id="contacts">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email Address</th>
          <th scope="col">Phone Number</th>
          <th scope="col">More</th>
        </tr>
      </thead>
      <tbody>
      ${contacts.length > 0 ? list : '<td colspan="5">No contact in list.</td>'}
      </tbody>
    </table>`;
}

function EachContact(contacts = []) {
  let list = "";

  contacts.forEach((contact, i) => {
    list += `
      <tr>
        <td>${i + 1}</td>
        <td>${contact.name ? contact.name : "-"}</td>
        <td>${contact.email ? contact.email : "-"}</td>
        <td>${contact.phone ? contact.phone : "-"}</td>
        <td>
            <div class="dropdown">
              <i
                style="cursor: pointer"
                class="bi bi-three-dots"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></i>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li>
                  <a class="dropdown-item text-danger delete-button" href="#" data-contact="${
                    contact.name
                  }">Delete</a>
                </li>
              </ul>
            </div>
          </td>
      </tr>
    `;
  });

  return list;
}
