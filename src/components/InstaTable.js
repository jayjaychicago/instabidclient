import React, { useEffect, useState } from "react"
import Pusher from "pusher-js";

const InstaTable = () => {
  const [depth, setDepth] = useState([])

  const fetchData = () => {
    fetch("https://zrzm31hhuk.execute-api.us-east-2.amazonaws.com/dev/depth?exchange=Insta&product=prod&user=julien")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDepth(JSON.parse(data.body).result)
      })
  }

  useEffect(() => {
    fetchData()

  }, [])

  return (
    <div class="h-100 d-flex align-items-center justify-content-center">
        <div id="sells">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Bids</th>
                <th scope="col">Bid Price</th>
                <th scope="col">Sale Price</th>
                <th scope="col">Qty for sale</th>
              </tr>
            </thead>
            <tbody>
                {typeof depth.sells !== 'undefined' && (

                depth.sells.map(depth => (
                <tr key={depth.price}>
                  <td className="table-data text-center">&nbsp;</td>
                  <td className="table-data text-center">&nbsp;</td>
                  <td className='table-data text-center'>{depth.price}</td>
                  <td className='table-data text-center'>{depth.qty}</td>
                </tr>
                                        )
                              )
                                                      )
              }
               {typeof depth.buys !== 'undefined' && (

depth.buys.map(depth => (
<tr key={depth.price}>
  <td className='table-data text-center'>{depth.qty}</td>
  <td className='table-data text-center'>{depth.price}</td>
  <td className="table-data text-center">&nbsp;</td>
  <td className="table-data text-center">&nbsp;</td>
</tr>
                        )
              )
                                      )
}
            </tbody>
          </table>
        </div>
    </div>    
  )
}

export default InstaTable