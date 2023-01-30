import React from "react";
import "./pinned.css";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import editIcon from "../../images/editIcon.png";
import deleteIcon from "../../images/deleteIcon.png";
import plusIcon from "../../images/plusIcon.png";

export default function Pinned() {
  let pinnedItems = [];
  const jsonData = require("../../database/pinnedChannel.json");
  for (let key in jsonData) {
    let itemComp = <PinnedItem itemTitle={key}></PinnedItem>;
    pinnedItems.push(itemComp);
  }
  console.log(pinnedItems);

  return (
    <div className="pinned" id="pinnedID">
      <div className="pinnedPage">
        <h3 className="pinnedTitle">Channel List</h3>
        <div className="pinnedTitleBar" />
        <div className="pinnedList">{pinnedItems}</div>
        <div className="pinnedItemAdd">
          <img className="pinnedItemAddIcon" src={plusIcon} />
          <h4 className="pinnedItemAddText">Add New Channel</h4>
        </div>
      </div>
    </div>
  );
}

const PinnedItem = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div className="pinnedListItem">
      <div className="pinnedListItemTop">
        <h4 className="pinnedListItemTitle">#{props.itemTitle}</h4>
        <div className="pinnedListItemIconBox">
          <img
            className="pinnedListItemIcon"
            src={editIcon}
            onClick={() => {
              handleShow();
            }}
          />
          <img className="pinnedListItemIcon" src={deleteIcon} />
        </div>
      </div>
      <div className="pinnedListItemTopBar" />
      <MyModal show={show} setShow={setShow} title={props.itemTitle}></MyModal>
    </div>
  );
};

const MyModal = (props) => {
  const handleClose = () => props.setShow(false);

  const saveNotice = async (_comment) => {
    let key = props.title;
    let url = "http://localhost:8000/postList/";
    await axios.post(url, {
      channel: key,
      comment: _comment,
    });
    //api 요청하는 부분
  };
  let inputComment = "sample";
  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={(e) => {
              inputComment = e.target.value;
            }}
          >
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveNotice(inputComment);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
