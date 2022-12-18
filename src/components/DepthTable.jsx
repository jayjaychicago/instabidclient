import { useState, useEffect } from "react";
import * as Pusher from "pusher-js";

const EVENT_NAME = "DEPTHUPDATE";
const CHANNEL_NAME = "Insta@prod";

export function DepthTable({}) {
  const [buys, setBuys] = useState([]);
  const [sells, setSells] = useState([]);
  const [pusher, setPusher] = useState(undefined);

  useEffect(() => {
    setPusher(
      new Pusher("122f17b065e8921fa6e0", {
        cluster: "us2",
      })
    );
  }, []);

  useEffect( () => {
    if (!pusher) return;

(async() => {
    
    const res = await fetch("https://api.instabid.io/depth?exchange=Insta&product=prod&user=julien")
      handleData(await res.json())

    const channel = pusher.subscribe(CHANNEL_NAME);
    channel.bind(EVENT_NAME, handleData);


    return () => {
        channel.unbind(EVENT_NAME);
      };

})()


  }, [pusher]);

  function handleData({ sells, buys }) {
    console.dir({ sells, buys });
    if (buys.length > 0)
      setBuys((prev) => update(prev, buys).sort((a, b) => b.price - a.price));
    if (sells.length > 0)
      setSells((prev) => update(prev, sells).sort((a, b) => a.price - b.price));
  }

  function update(a, orders) {
    if (
      orders.find((_order) => a.find((order) => order.price === _order.price))
    ) {
      return a.flatMap((_order) =>
        orders.map((order) => {
          console.dir(order.price === _order.price);
          return order.price === _order.price ? order : _order;
        })
      );
    }
    return [...a, ...orders];
  }

  return (
    <div className="flex gap-8 flex-wrap sm:flex-nowrap">
      <div className="w-full bg-gray-800 p-4 my-4">
        <h2 className="text-xl font-black">sells</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Qty for sale</th>
              <th>Sale Price</th>
            </tr>
          </thead>
          <tbody>
            {sells
              .filter((order) => order.qty)
              .map((order, i) => (
                <tr key={i}>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="w-full bg-gray-800 p-4 my-4">
        <h2 className="text-xl font-black">buys</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Bids</th>
              <th>Bid Price</th>
            </tr>
          </thead>
          <tbody>
            {buys
              .filter((order) => order.qty)
              .map((order, i) => (
                <tr key={i}>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
