
import React, { useState, useRef, useEffect } from 'react';
import { randomId } from 'variables/constants';

const SANDBOX_CLIENT_ID = 'Aeg3WWKmVjMwfGK2pdyeP-a47jzKDYA-4yN34bRvZvPhXd6SO2hga4qFskcGCuV-mK5LsAf_fKYFTQ5-'
function Product({  amount, placeOrder, paypal }) {
    const [paidFor, setPaidFor] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();
    

    useEffect(() => {
        setTimeout(() => {
            paypal
                .Buttons({
                    // onClick: function (e, actions) {
                    //     validate()
                    //     if (product == '' || !moveOn) {
                    //         return actions.reject()
                    //     }
                    //     else {
                    //         return actions.resolve()
                    //     }
                    // },
                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: '',
                                    amount: {
                                        currency_code: 'AUD',
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: async (data, actions) => {
                        const order = await actions.order.capture();
                        setPaidFor(true);
                        console.log(order);
                        placeOrder()
                    },
                    onError: err => {
                        setError(err);
                        console.error(err);
                    },
                })
                .render(paypalRef.current
                )

        })
    }, [amount]);




    if (paidFor) {
        return (
            <div>
                <h1>Congrats</h1>
            </div>
        );
    }

    return (
        <div >
            {error && <div>Uh oh, an error occurred! {error.message}</div>}

            <div className="payment-container-style1" key={randomId()} ref={paypalRef} />
        </div>
    );
}

function PaypalComponent({ amount, placeOrder, paypal }) {


    return (
        <div    >

            <Product
                placeOrder={placeOrder}
                paypal={paypal}
                amount={amount}
                // validate={validate}
                // moveOn={moveOn}
                // product={data}
            />

        </div>
    );
}

export default PaypalComponent;