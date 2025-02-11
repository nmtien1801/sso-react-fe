import { useEffect, useState } from "react";
import { getAllPath, deletePath } from "../../redux/roleSlice";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import CreateNewPathModal from "./createNewPathModal";

const Path = (props) => {
  const [listPaths, setListPaths] = useState([]);
  const paths = useSelector((state) => state.role.paths);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPath());
  }, []);

  useEffect(() => {
    setListPaths(paths);
  }, [paths]);

  const handleDeletePaths = async (role) => {
    let data = await dispatch(deletePath(role.id));
    if (data && +data.payload.EC === 0) {
      toast.success(data.EM);
      await dispatch(getAllPath());
    } else {
      toast.error(data.EM);
    }
  };

  console.log("paths: ", paths);

  return (
    <>
      <div className="user-body">
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Url</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listPaths && listPaths.length ? (
              <>
                {listPaths.map((item, index) => {
                  return (
                    <tr key={`row-${index}`}>
                      {/* <td>{(currentPage - 1) * currentLimit + index + 1}</td> */}
                      <td>{item.id}</td>
                      <td>{item.url}</td>
                      <td>{item.description}</td>

                      <td>
                        {/* <span
                          title="Edit"
                          className="edit me-3"
                          onClick={() => {
                            handleEditUser(item);
                          }}
                        >
                          <i className="fa fa-pencil"></i>
                        </span> */}
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => {
                            handleDeletePaths(item);
                          }}
                        >
                          <i
                            className="fa fa-trash-o delete"
                            style={{ color: "red" }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <>
                <tr>
                  <td colSpan={4}>not found roles</td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-center h-screen bg-gray-100">
          <CreateNewPathModal />
        </div>
      </div>
    </>
  );
};

export default Path;
