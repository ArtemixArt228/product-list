import React, { useState } from "react";

import "./index.css";

import Modal from "../modal";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deletedId,
  deleteMod,
  getModalSelector,
  openMod,
} from "../../redux/modal/modalSlice";

const ProductCard = ({
  imageUrl,
  name,
  _id,
}: {
  imageUrl: string;
  name: string;
  _id: string;
}) => {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(getModalSelector);

  return (
    <>
      {modalIsOpen && <Modal tryUpdate={false} />}
      <article className="product_card">
        <img
          className="product_card-image"
          src={imageUrl}
          alt="Product image"
        />
        <div className="product_details">
          <h4 className="product_details-headline">{name}</h4>
          <div className="product_details-btns">
            <button
              className="product_details-btn"
              onClick={() => {
                dispatch(deletedId(_id));
                dispatch(openMod());
                dispatch(deleteMod(true));
              }}
            >
              Remove
            </button>
            <Link className="product_details-link" to={_id}>
              View More
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductCard;
