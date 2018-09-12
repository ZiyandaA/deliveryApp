import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { getOrdersAction } from "../store/modules/orders";

class OrdersComponent extends Component {
    componentDidMount() {
        const { orders, getOrders } = this.props;

        if (orders.length === 0) {
            getOrders();
        }
    };

    render() {
        const { orders, isLoadingOrders } = this.props;

        if(orders.length === 0 && isLoadingOrders) {
            return <p>Loading...</p>
        }

        return (
            <div id="middleContainer orders-page" className="try primary-bg-color">
                <div className="orders-container">
                    <h4 className="my-text-white my-text-center">List of Orders</h4>
                    <div className="middleBox">
                        <div className="my-container">
                            <div className="my-responsive-table res-order white-bg-color">
                            <Link to={`/`}>Create New Order </Link>
                            {/* <a href="/" className="new-order"><strong>Create new order</strong></a> */}
                                <table className="table order-list-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Order Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order, i) => (
                                                <tr key={order._id}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        <Link to={`/orders/${order._id}`}>{order._id}</Link>
                                                    </td>
                                                    <td>{order.customer_name}</td>
                                                    <td>{order.price}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ orders }) => ({
    orders: orders.list,
    isLoadingOrders: orders.isLoadingList,
});

const mapDispatchToProps = (dispatch) => ({
    getOrders: () => dispatch(getOrdersAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
