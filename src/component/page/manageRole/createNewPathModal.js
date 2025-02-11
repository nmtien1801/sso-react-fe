import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createNewPath, getAllPath } from "../../redux/roleSlice";

const CreateNewPathModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("");

  const dispatch = useDispatch();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleAddPath = async (pathData) => {
    let data = [
      {
        url: pathData,
        description: "",
      },
    ];
    let res = await dispatch(createNewPath(data));
    console.log("res: ", res);

    if (res && +res.payload.EC === 0) {
      toast.success(res.payload.EM);
      await dispatch(getAllPath());
      closeModal();
    } else {
      toast.error(res.payload.EM);
    }
  };

  return (
    <div className="p-4">
      {/* Nút mở modal */}
      <Button variant="primary" onClick={openModal}>
        ➕ Thêm
      </Button>

      {/* Modal */}
      <Modal show={isOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Mới</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            placeholder="Nhập path..."
            className="form-control"
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAddPath(path);
            }}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateNewPathModal;
