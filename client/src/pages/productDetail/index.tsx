import React, { useEffect, useState } from "react";

import "./index.css";

import { useParams } from "react-router-dom";

import { useGetProductQuery } from "../../redux/services/products";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../redux/services/comments";

import Modal from "../../components/modal";
import { Product } from "../../interfaces/product";
import { getModalSelector, openMod } from "../../redux/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const ProductDetail = () => {
  const { id } = useParams();

  const openModal = useAppSelector(getModalSelector);

  const {
    data: dataProduct,
    isFetching: isFetchingProduct,
    error,
  }: {
    data: { product: Product };
    isFetching: boolean;
    error: any;
  } = useGetProductQuery<any>(id);

  const [addNewComment, response] = useAddCommentMutation();
  /*const { data: dataComments, isFetching: isFetchingComments } =
    useGetCommentsQuery();*/

  const [comment, setComment] = useState<any>({
    productId: id,
    description: "",
  });

  const dispatch = useAppDispatch();

  const addComment = () => {
    if (!comment.productId || !comment.description) {
      console.log(comment);
    } else {
      addNewComment(comment)
        .unwrap()
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      {openModal && (
        <Modal
          productId={dataProduct?.product._id as string}
          tryUpdate={true}
          productToUpdate={dataProduct?.product}
        />
      )}
      <div className="product_container">
        <div className="product_body">
          <div className="product_body-img">
            <img src={dataProduct?.product.imageUrl} alt="Product Image" />
          </div>
          <div className="product_body-details">
            <h2 className="details-heading">{dataProduct?.product.name}</h2>
            <div className="details-count">
              Count: <span>{dataProduct?.product.count}</span>
            </div>
            <div className="details-size">
              <p>width: {dataProduct?.product.size.width}</p>
              <p>height: {dataProduct?.product.size.height}</p>
            </div>
            <div className="details-weight">
              <p>weight: {dataProduct?.product.weight}</p>
            </div>
            <button
              className="btn"
              onClick={() => {
                dispatch(openMod());
              }}
            >
              Edit Product
            </button>
          </div>
        </div>
        <div className="product_comments-body">
          <input
            type="text"
            value={comment.description}
            onChange={(e) =>
              setComment((prevState: any) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <button onClick={addComment}>Add Comment</button>
          <div className="product_comments-comment">
            {/*dataComments?.map((comment) => (
              <p>{comment}</p>
            ))*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;