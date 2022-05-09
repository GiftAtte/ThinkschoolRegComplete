import { useRouter } from "next/router";
import DataTable from "../../components/utils/AppTable";
import dynamic from "next/dynamic";
const index = () => {
    
    //const path='/students/registration'
    const deleteSchool = () => { };
    const route = useRouter();
    const navigate = (path) => {
       // e.preventDefault()
        route.push(path)
    }
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];
  return (
 
      <div className="card-body ">
        <DataTable
          className="fs-6 fw-bold"
          title="Student List"
          columns={columns}
          data={data}
          editAction={() => navigate("/students/update")}
          deleteAction={deleteSchool}
          createAction={() => navigate("/students/registration")}
          action
          search
          create
        />
      </div>
   
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
