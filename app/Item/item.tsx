"use client";
import React from "react";
import { ItemProps, Props } from "../Types/types"; // Import the common types
import { CartDashFill, CartPlusFill } from "react-bootstrap-icons";
import styles from "./item.module.css";

function Item({
  id,
  name,
  price,
  img,
  colour,
  increaseItem,
  decreaseItem,
  clearItem,
  quantity,
}: ItemProps & Props): JSX.Element {
  const qty =
    quantity(id) === 0 || quantity(id) === undefined ? "Qty" : quantity(id);

  return (
    <div className={styles.description}>
      <div className={styles.center}>
        <img src={img} className={styles.image} alt={name}></img>
        <div className={styles.content}>
          <div className={styles.heading}>{name}</div>
          <div className={styles.price}>${price}</div>
        </div>
      </div>
      <div className={styles.quantity}>
        <button
          className={styles.card}
          onClick={() => {
            decreaseItem(id);
          }}
          disabled={qty === "Qty" ? true : false}
        >
          <CartDashFill size={20} />
        </button>
        <div className={styles.quantityParent}>
          <div className={styles.qty}>{qty}</div>
          <button
            className={styles.card_remove}
            onClick={() => {
              clearItem(id);
            }}
          >
            Remove
          </button>
        </div>
        <button
          className={styles.card}
          onClick={() => {
            increaseItem(id);
          }}
        >
          <CartPlusFill size={20} />
        </button>
      </div>
    </div>
  );
}

export default Item;
