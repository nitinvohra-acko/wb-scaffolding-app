import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TaskForm from "./taskForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

interface ModalProps {
  open: boolean;
  handleClose: any;
  onSubmit: any;
}
const BasicModal: React.FC<ModalProps> = ({ open, handleClose, onSubmit }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card>
            <CardHeader
              title={"Add new task"}
              action={
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <TaskForm onSubmit={onSubmit} />
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
