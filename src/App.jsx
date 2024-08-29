import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Guitar } from "./components/Guitar";
import { Header } from "./components/Header";
import { db } from "./data/db";

function App() {

  const initialCart = () => {
    const localeStorageCart = localStorage.getItem('cart')
    return localeStorageCart ? JSON.parse(localeStorageCart) : [];
  }

  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
      localStorage.getItem('cart')
  },[])

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id == item.id);
    if (itemExists >= 0) {
      //elemento existe en el carrito
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      // no existe agregamos al cart
      item.quantity = 1; //generamos un nuevo atributo de cantidad
      setCart([...cart, item]); // generamos la copia de carrito y agregamos el nuevo
      console.log(cart);
    }
  }

  function removeFromCart(id){
    setCart((prevCart) => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item;
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id){
    const updateCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity - 1,
        }
      }
      return item;
    })
    setCart(updateCart)
  }

  function clearCart(){
    setCart([])
  }

  

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
