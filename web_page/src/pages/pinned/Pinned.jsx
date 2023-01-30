import React from "react";
import "./pinned.css";
import axios from "axios";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
        <AddChannelDropDwon />
      </div>
    </div>
  );
}

const PinnedItem = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <div className="pinnedListItem">
      <div className="pinnedListItemTop">
        <h4 className="pinnedListItemTitle">#{props.itemTitle}</h4>
        <div className="pinnedListItemIconBox">
          <img
            className="pinnedListItemIcon"
            src={editIcon}
            onClick={() => {
              handleShowEdit();
            }}
          />
          <img
            className="pinnedListItemIcon"
            src={deleteIcon}
            onClick={() => {
              handleShowDelete();
            }}
          />
        </div>
      </div>
      <div className="pinnedListItemTopBar" />
      <EditModal
        show={showEdit}
        setShowEdit={setShowEdit}
        title={props.itemTitle}
      ></EditModal>
      <DeleteModal
        show={showDelete}
        setShowDelete={setShowDelete}
        title={props.itemTitle}
      ></DeleteModal>
    </div>
  );
};

const EditModal = (props) => {
  const handleCloseEdit = () => props.setShowEdit(false);

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
      <Modal show={props.show} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>#{props.title}</Modal.Title>
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
              <Form.Label>고정 메시지</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              saveNotice(inputComment);
              handleCloseEdit();
            }}
          >
            수정
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const DeleteModal = (props) => {
  const handleCloseDelete = () => props.setShowDelete(false);

  const deletePin = async () => {
    let key = props.title;
    let url = "http://localhost:8000/deleteList/";
    await axios.post(url, {
      channel: key,
    });
  };
  return (
    <>
      <Modal show={props.show} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>#{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>#{props.title}을(를) 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            취소
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletePin();
              handleCloseDelete();
            }}
          >
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const AddChannelDropDwon = () => {
  let dropdownList = [];

  const jsonData = require("../../database/pinAbleChannel.json");

  const addNewChannel = async (key) => {
    let url = "http://localhost:8000/postList/";
    await axios.post(url, {
      channel: key,
      comment: "please input your notice!",
    });
  };

  for (let key in jsonData) {
    let temp = (
      <Dropdown.Item
        onClick={() => {
          addNewChannel(key);
        }}
      >
        {key}
      </Dropdown.Item>
    );
    dropdownList.push(temp);
  }

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          추가할 채널을 선택해주시오
        </Dropdown.Toggle>
        <Dropdown.Menu variant="dark">{dropdownList}</Dropdown.Menu>
      </Dropdown>
    </>
  );
};
