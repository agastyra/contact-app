const deleteButton = document.querySelector(".delete-button");

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
