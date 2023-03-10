

import { useState } from "react";

const InstaForm = () => {
    const  isAuthenticated  = true;

    const [side, setSide] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
 
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
          let res = await fetch("https://api.instabid.io/order", {
            method: "POST",
            body: JSON.stringify({
              exchange: "Insta",
              product: "prod",
              side: side,
              qty: qty,
              price: price,
              user: "julien",
              apiKey: "12345"
            }),
          });
          let resJson = await res.json();
          if (res.status === 200) {
            setSide("");
            setQty("");
            setPrice("");
            setMessage("Done!");

          } else {
            setMessage("Some error occured");
          }
        } catch (err) {
          console.log(err);
        }
      };

return (


    isAuthenticated ? (



    <div className="InstaForm" class="d-flex justify-content-center">
      <form class="form-horizontal d-inline-flex p-2" onSubmit={handleSubmit}>

      <div class="btn-group m-2" role="group" data-toggle="buttons">
                             
        <input type="radio" class="btn-check" name="buySell" id="placeBidBuytest" value="B" autocomplete="off" onChange={(e) => setSide(e.target.value)}></input>
        <label class="btn btn-outline-primary" for="placeBidBuytest">Buy</label>    

        <input type="radio" class="btn-check" name="buySell" id="placeBidSelltest" value="S" autocomplete="off" onChange={(e) => setSide(e.target.value)}></input>
        <label class="btn btn-outline-primary" for="placeBidSelltest">Sell</label>    

      </div>
 
        <input class="form-control m-2"
          type="number"
          value={qty}
          placeholder="Qty"
          onChange={(e) => setQty(e.target.value)}
        />


        <div class="input-group m-2">
            <div class="input-group-prepend">
                <span class="input-group-text">$</span>
            </div>
            <input class="form-control"
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
            />
            
        </div>

        <button class="btn btn-primary btn-sm m-2"type="submit">Trade</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
    )
    :

    (
      <div>This is where you put your authentication process or components</div>
      ))
    
    
}

export default InstaForm