import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

console.log(process.env.REACT_APP_SANDBOX_CLIENT)

function PaypalCheckoutButton({ order }) {
    const paypalConf = {
        currency: 'EUR',
        env: 'sandbox', // cuando sea produccion es 'production'
        client: {
            sandbox: process.env.REACT_APP_SANDBOX_CLIENT,    // aqui va el id del client sandbox de prueba en este caso lo estoy jalando del .env del proyecto pero el id se obtiene en el sandbox de paypal
            production: '',                                   // aqui va el id de client produccion
        },
        style: {
            label: 'pay',
            size: 'medium',
            shape: 'rect',
            color: 'gold',
        }
    }

    const PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

    const payment = (data, actions) => {
        const payment = {
            transactions: [
                {
                    amount: {
                        total: order.total,
                        currency: paypalConf.currency
                    },
                    description: 'Compra en Test App',
                    custom: order.customer || '',
                    item_list: {
                        items: order.items
                    }
                }
            ],
            note_to_payer: 'Contactanos para cualquier aclaracion',
        };

        return actions.payment.create({ payment });
    };

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
        .then(response => {
            console.log(response);
            alert(`El pago fue procesado correctamente, ID: ${response.id}`);
        })
        .catch(error => {
            console.log(error);
            alert('Ocurrio un error al procesar el pago con PayPal');
        });
    };

    const onError = (error) => {
        console.log(error);
        alert('El pago no fue realizado, vuelva a intentarlo');
    };

    const onCancel = (data, actions) => {
        alert('Pago no realizado, el usuario cancelo el proceso');
    };


    return (
        <PayPalButton
            env={paypalConf.env}
            client={paypalConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypalConf.style}
            commit
            locale="en_US" // se puede cambiar
        />
    );
}

export default PaypalCheckoutButton;