import React, { useState, useRef, ChangeEvent } from "react";

import "./index.css";

import { Product } from "../../interfaces/product";

import {
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../redux/services/products";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  closeMod,
  getDeletedIdSelector,
  getDeleteModSelector,
} from "../../redux/modal/modalSlice";
import {
  addProduct,
  deleteById,
  updateTheProduct,
} from "../../redux/product/productSlice";

const Modal = ({
  productId = "",
  tryUpdate = false,
  productToUpdate,
}: {
  productId?: string;
  tryUpdate?: boolean;
  productToUpdate?: Product;
}) => {
  const [product, setProduct] = useState<any>({
    imageUrl: productToUpdate?.imageUrl || "",
    name: productToUpdate?.name || "",
    count: productToUpdate?.count || 1,
    size: {
      height: productToUpdate?.size.height || 0,
      width: productToUpdate?.size.width || 0,
    },
    weight: productToUpdate?.weight || "",
  });

  const dispatch = useAppDispatch();

  const deleteModal = useAppSelector(getDeleteModSelector);
  const deletedId = useAppSelector(getDeletedIdSelector);

  const [addNewProduct, response] = useAddProductMutation();
  const [deleteProduct, res] = useDeleteProductMutation();
  const [updateProduct, r] = useUpdateProductMutation();

  const removeProduct = () => {
    dispatch(deleteById(deletedId));
    deleteProduct(deletedId);
    dispatch(closeMod());
  };

  const checkProductValue = () => {
    if (
      product.imageUrl === "" ||
      product.name === "" ||
      product.count === 0 ||
      product.size.height === 0 ||
      product.size.width === 0 ||
      product.weight === ""
    ) {
      return;
    } else {
      if (tryUpdate) {
        dispatch(updateTheProduct({ id: productId, ...product }));
        updateProduct({ id: productId, product });
        console.log(product);
      } else {
        dispatch(addProduct({ id: productId, ...product }));
        addNewProduct(product)
          .unwrap()
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }

      dispatch(closeMod());
    }
  };

  const makeProduct = (e: ChangeEvent<HTMLInputElement>, label: string) => {
    e.preventDefault();

    setProduct((prevState: Product) => ({
      ...prevState,
      [label]: e.target.value,
    }));
  };

  return (
    <div className="modal_wrapper">
      {deleteModal ? (
        <div className="modal_body-delete">
          <div className="modal_body-text">
            Do you really want to delete this product?
          </div>
          <div className="modal_body-btn body_btn">
            <button
              className="body_btn-cancel"
              onClick={() => dispatch(closeMod())}
            >
              Cancel
            </button>
            <button
              className="body_btn-confirm"
              onClick={() => removeProduct()}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <div className="modal_body-form">
          <h3 className="modal_heading">Product Details</h3>
          <form className="modal-form">
            <input
              value={product.name}
              type="text"
              placeholder="Product name..."
              onChange={(e) => makeProduct(e, "name")}
            />
            <input
              value={product.imageUrl}
              onChange={(e) => makeProduct(e, "imageUrl")}
              type="text"
              placeholder="Product image(url)..."
            />
            <input
              value={product.count}
              type="number"
              min="1"
              placeholder="Product count..."
              onChange={(e) => makeProduct(e, "count")}
            />
            <input
              type="text"
              placeholder="Product width..."
              value={product.size.width}
              onChange={(e) => {
                const p = { ...product };
                p.size.width = e.target.value;
                setProduct(p);
              }}
            />
            <input
              type="text"
              placeholder="Product height..."
              value={product.size.height}
              onChange={(e) => {
                const p = { ...product };
                p.size.height = e.target.value;
                setProduct(p);
              }}
            />
            <input
              type="text"
              placeholder="Product weight..."
              value={product.weight}
              onChange={(e) => makeProduct(e, "weight")}
            />
          </form>
          <div className="modal_body-btn body_btn">
            <button
              className="body_btn-confirm"
              onClick={() => dispatch(closeMod())}
            >
              Cancel
            </button>
            <button onClick={checkProductValue} className="body_btn-cancel">
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
