import DataTable from "react-data-table-component";
import TextInputeSmall from "./TextInputeSmall";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useRouter } from "next/router";
const AppTable = ({
  columns,
  data,
  deleteAction,
  editAction,
  create,
  search,
  action,
  title,
  editPath,
  createAction,
  ...props
}) => {

   
// sweet Alert confirmation
  const confirmDelete = (id) => {
      console.log(id)
        Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
    if (result.isConfirmed) {
        deleteAction(id);
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})
    }



    const paginationComponentOptions = {
      rowsPerPageText: "Perpage",
      rangeSeparatorText: "of",
     
      perPage: 5,
    };

  const fullRows = [
    ...columns,
    action
      ? {
          name: "Actions",
          button: true,
          cell: (row) => (
            <>
              {editAction && (
                <button
                  className="btn btn-sm btn-primary m-1"
                  title="edit"
                  onClick={editAction}
                >
                  <i className="bi bi-pen-fill"></i>
                </button>
              )}

              {deleteAction && (
                <button
                  className="btn  btn-danger btn-sm"
                  title="delete"
                  onClick={()=>confirmDelete(row._id)}
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              )}
            </>
          ),
          allowOverflow: true,
        }
      : {},
  ];

  return (
    <>
      <div className=" row mb-1 mt-2 ">
        <div className="col-sm-3 col-12">
          {search && <TextInputeSmall placeholder="search..." />}
        </div>

        <div className="col mt-3">
          {create && (
            <button
              className="btn btn-primary rounded-pill float-end "
              onClick={createAction}
            >
              <i className="bi bi-plus-circle-fill"></i> Add New
            </button>
          )}
        </div>
      </div>
      <div className="col-12 col-sm-12">
        <DataTable
          columns={fullRows}
          data={data}
          title={title}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          {...props}
        />
      </div>
    </>
  );
};

export default AppTable;
