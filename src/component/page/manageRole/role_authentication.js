import { useEffect, useState } from "react";
// import "./pathRole.scss";
import { toast } from "react-toastify";
import {
  getAllPath, getRole, getPathByRoleId, authenticateRole
} from "../../redux/roleSlice";
import _ from "lodash"; // CRUD in arr
import { useSelector, useDispatch } from "react-redux";

const Role_authentication = () => {
  const {paths, roles} = useSelector((state) => state.role);
  const dispatch = useDispatch();
  
  const [listPaths, setListPaths] = useState([]);
  const [role, setRole] = useState([]);
  const [selectRole, setSelectRole] = useState("");
  // merge 2 bảng listPaths với role của role đó
  const [assignPathsByRole, setAssignPathsByRole] = useState([]);   // arr tích checkbox

  useEffect(() => {
    dispatch(getAllPath());
  }, []);

  useEffect(() => {
    setListPaths(paths);
  }, [paths]);

  useEffect(() => {
    dispatch(getRole());
    dispatch(getAllPath());
    // dispatch(getPathByRoleId(1));
  }, []);

  useEffect(() => {
    setRole(roles);
  }, [roles]);

  // select chọn role
  const handleOnChangeRole = async (value) => {
    setSelectRole(value);
    if (value) {
      let data = await dispatch(getPathByRoleId(value));

      if (data && +data.payload.EC === 0) {
        let rs = buildDataByRole(data.payload.DT.Paths, listPaths);
        setAssignPathsByRole(rs);
        toast.success(data.payload.EM);
      } else {
        toast.error(data.payload.EM);
      }
    }
  };

  // merge path mà role đó có trong allPath
  const buildDataByRole = (pathWithRole, allPath) => {
    let rs = [];
    if (allPath && allPath.length > 0) {
      allPath.map((role) => {
        let object = {}; // tạo mới object
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;
        object.isAssigned = false; // thêm vào object vừa tạo

        // nếu role chọn có trong allPath thì -> True
        if (pathWithRole && pathWithRole.length > 0) {
          // vòng some -> true or false
          object.isAssigned = pathWithRole.some(
            (item) => item.url === object.url
          );
        }
        rs.push(object);
      });
    }
    return rs;
  };

  // thay đổi state của checkbox
  const onChangeHandleCheckBox = (value) => {
    // console.log(">>check click change option id: ", value);
    const _authenticateRole = _.cloneDeep(assignPathsByRole);
    // search: js find array and update value
    let foundIndex = assignPathsByRole.findIndex(
      (item) => +item.id === +value
    );

    // trả về -1 nếu không có dấu +
    if (foundIndex > -1) {
      _authenticateRole[foundIndex].isAssigned =
        !_authenticateRole[foundIndex].isAssigned;
    }

    setAssignPathsByRole(_authenticateRole);
  };

  // delete & create role khi update click checkbox
  const buildDataToSave = () => {
    let rs = {};
    const _authenticateRole = _.cloneDeep(assignPathsByRole);

    // tìm những option được click
    let pathsRoleFilter = _authenticateRole.filter(
      (item) => item.isAssigned === true
    );

    // chuyển data tới BE có dạng groupId, roleId (/assign-to-group)
    let finalPathOfRole = pathsRoleFilter.map((item) => {
      let data = { roleID: +selectRole, pathID: +item.id };
      return data;
    });
    rs.roleID = selectRole;
    rs.role_path = finalPathOfRole;
    return rs;
  };

  // button save
  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await dispatch(authenticateRole(data));
    
    if (res && res.payload.EC === 0) {      
      toast.success(res.payload.EM);
    } else {
      toast.error(res.payload.EM);
    }
  };

  return (
    <div className=" group-role-container">
      <div className="container">
        <div className="mt-3">
          <h4>Group Roles: </h4>
          <div className="assign-group-role">
            Select Role
            <div className="col-12 col-sm-6 form-group">
              <label htmlFor="GroupSelect">
                Role (<span className="red">*</span>) :
              </label>
              <select
                id="GroupSelect"
                className="form-select"
                onChange={(event) => {
                  handleOnChangeRole(event.target.value);
                }}
              >
                <option value="">Please select your role</option>
                {role &&
                  role.length > 0 &&
                  role.map((item, index) => {
                    return (
                      <option key={`role-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <hr />

            {selectRole && (
              <div className="roles">
                <h5>Assign Role</h5>
                {assignPathsByRole &&
                  assignPathsByRole.length > 0 &&
                  assignPathsByRole.map((item, index) => {
                    return (
                      // gán động id và for để không chọn select đầu tiên mãi
                      <div className="form-check" key={`listRole-${index}`}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={item.id}
                          id={`listRole-${index}`}
                          checked={item.isAssigned}
                          onChange={(event) => {
                            onChangeHandleCheckBox(event.target.value);
                          }}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`listRole-${index}`}
                        >
                          {item.url}
                        </label>
                      </div>
                    );
                  })}
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      handleSave();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role_authentication;
