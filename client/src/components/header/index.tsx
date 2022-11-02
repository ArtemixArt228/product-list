import React, { useState } from "react";

import "./index.css";
import Modal from "../modal";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import { getModalSelector, openMod } from "../../redux/modal/modalSlice";

const Header = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: Function;
}) => {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(getModalSelector);

  const deleteModal = false;

  return (
    <header className="header">
      <div className="header_container header-body">
        <div className="header_name">
          <h1 className="header_name-headline">
            <Link to="/">Artemix's Product List</Link>
          </h1>
        </div>
        <div className="header_items">
          <div className="header_items-dropdown">Dropdown</div>
          <div className="header_items-add">
            <button
              onClick={() => dispatch(openMod())}
              className="header_items-add_btn"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      {modalIsOpen && <Modal />}
    </header>
  );
};

export default Header;
