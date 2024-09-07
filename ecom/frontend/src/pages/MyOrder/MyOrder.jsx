import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/useorders`, {}, { headers: { token } });
            setData(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const styles = {
        container: {
            padding: '20px',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '20px',
            textAlign: 'center',
        },
        ordersContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        orderCard: {
            display: 'flex',
            alignItems: 'flex-start',
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
        },
        orderIcon: {
            width: '50px',
            height: '50px',
            marginRight: '15px',
        },
        orderDetails: {
            flex: 1,
        },
        orderItems: {
            fontSize: '16px',
            marginBottom: '10px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        orderAmount: {
            fontSize: '14px',
            marginBottom: '5px',
        },
        orderItemCount: {
            fontSize: '14px',
            marginBottom: '5px',
        },
        orderStatus: {
            fontSize: '14px',
            marginBottom: '5px',
            display: 'flex',
            alignItems: 'center',
        },
        statusBullet: {
            color: '#4CAF50',
            marginRight: '5px',
        },
        trackButton: {
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        trackButtonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h3 style={styles.heading}>My Orders</h3>
            <div style={styles.ordersContainer}>
                {data.map((order, index) => (
                    <div key={index} style={styles.orderCard}>
                        <img src={assets.parcel_icon} alt="Parcel icon" style={styles.orderIcon} />
                        <div style={styles.orderDetails}>
                            <p style={styles.orderItems}>
                                {order.items.map((item, index) => (
                                    <span key={index}>
                                        {item.name} x {item.quantity}
                                        {index < order.items.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p style={styles.orderAmount}>${order.amount}.00</p>
                            <p style={styles.orderItemCount}>Items: {order.items.length}</p>
                            <p style={styles.orderStatus}>
                                <span style={styles.statusBullet}>&#x25cf;</span> <b>{order.status}</b>
                            </p>
                            <button
                                style={styles.trackButton}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.trackButtonHover.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.trackButton.backgroundColor}
                                onClick={fetchOrders}
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
