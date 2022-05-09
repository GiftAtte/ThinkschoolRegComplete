import { Router, useRouter } from "next/router";
import DataTable from "../../components/utils/AppTable";
import dynamic from "next/dynamic";
const index = () => {
  const editSchool = () => {};
  const deleteSchool = () => {};
  const router = useRouter();
  const newSchool = () => router.push("/schools/create");
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
        title="School List"
        columns={columns}
        data={data}
        editAction={editSchool}
        deleteAction={deleteSchool}
        createAction={newSchool}
        action
        search
        create
      />
    </div>
  );
};

export default dynamic(() => Promise.resolve(index), { ssr: false });
