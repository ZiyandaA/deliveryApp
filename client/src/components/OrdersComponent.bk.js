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
                        <div id="middleContainer" class="primary-bg-color row align-items-center">
                <div class="col-md-12 container">
                <h4 class="text-white text-center">List of Orders</h4>
                <br />
                    <div class="row middleBox">
                    <div class="col-md-12 col-sm-12 col-xs-12 d-block white-bg-color">
                        <div class="row align-items-center">
                        <div class="col-md-12 container leftSide">
                            <div class="scrollable-content">
                                <h5 class="text-center">Orders</h5>
                                <a href="/" class="float-right"><strong>Create new order</strong></a>
                                <div class="form-group">
                                    <div class="table-responsive">
                            <table class="table">
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
                      <br />
                </div>
              </div>
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
