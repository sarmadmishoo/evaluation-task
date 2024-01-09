"use client";
import React from "react";
import { COLOR_OPTIONS, API_URL } from "../app/constants/CONSTANTS";
import { ItemProps, itemItem } from "./Types/types";
import Item from "./Item";
import styles from "./page.module.css";

function Home() {
  const [product, setProduct] = React.useState<ItemProps[]>([]); // All product to be locally store in product state
  const [item, setItem] = React.useState<itemItem[]>([]); // All Item to be locally store in Item state which they selected to purchase
  const [selectedColor, setSelectedColor] = React.useState<string>(""); //For selected color filter

  // get data from API once Page render first time
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // Method to add multiple item from array list
  const increaseItem = (itemId: number) => {
    const updateditem = [...item];
    const existingProduct = updateditem.find((item) => item.id === itemId);

    if (existingProduct) {
      existingProduct.qty += 1;
    } else {
      const productToAdd = product.find((item) => item.id === itemId);
      if (productToAdd) {
        updateditem.push({ ...productToAdd, qty: 1 });
      }
    }
    setItem(updateditem);
  };

  // Method to remove multiple item from array list
  const decreaseItem = (itemId: number) => {
    const updateditem = item.map((item) => {
      if (item.id === itemId) {
        item.qty -= 1;
      }
      return item;
    });

    setItem(updateditem);
  };

  //Clear All Item from Array
  const clearItem = (itemId: number) => {
    const updateditem = item.filter((item) => item.id !== itemId);
    setItem(updateditem);
  };

  // calculate All item price
  const calculateTotalPrice = () => {
    return item.reduce((total, item) => total + item.qty * item.price, 0);
  };

  // filter on the basis of color
  const filteredproduct = product.filter((item: ItemProps) => {
    return selectedColor ? item.colour === selectedColor : true;
  });

  // display item quantity
  const getItemQty = (itemId: number) => {
    const itemQuantity = item.find((item) => {
      return itemId === item.id;
    });

    return itemQuantity?.qty || 0;
  };

  return (
    <main className={styles.main}>
      <div className={styles.dropdown}>
        <select
          className={styles.selectColor}
          value={selectedColor}
          onChange={(e) => {
            setSelectedColor(e.target.value);
            setItem([]);
          }}
        >
          {COLOR_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {filteredproduct.map((item: ItemProps) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          img={item.img}
          colour={item.colour}
          increaseItem={increaseItem}
          decreaseItem={decreaseItem}
          clearItem={clearItem}
          quantity={getItemQty}
        />
      ))}
      <div className={styles.total}>
        <h1>Total : {calculateTotalPrice().toFixed(2)}</h1>
      </div>
    </main>
  );
}

export default Home;
