import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getOrderAction,
    deleteOrderAction,
    confirmOrderAction
} from '../store/modules/orders';

class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.displayOrderInfo = this.displayOrderInfo.bind(this);
    }

    componentDidMount() {
        const {
            order,
            match: { params }
        } = this.props;

        if (Object.keys(order).length === 0 || order._id !== params.orderId) {
            this.props.getOrder(params.orderId);
        }
    }

    handleConfirmOrder = () => {
        const {
            match: { params },
        } = this.props;
        let email;

        do {
            email = prompt("Enter the email address the confirmation mail should be sent to", "test@mail.com");
        } while (!email);

        this.props.confirmOrder(email, params.orderId);
    };

    handleUpdateOrder = () => {
        const {
            history: { push },
            match: { params }
        } = this.props;
        push(`/?mode=edit&orderId=${params.orderId}`);
    };

    handleDeleteOrder = async () => {
        const {
            match: { params },
        } = this.props;
        if (window.confirm('Are you sure you want to delete this order?')) {
            await this.props.deleteOrder(params.orderId);
        }
    };

    displayOrderInfo() {
        let divElements = [];
        Object.keys(this.props.order).forEach(key => {
            let elem = <div>{key}: {this.props.order[key]}</div>
            divElements.push(elem);
        });
        return <div>
            {divElements.map(item => {
                return item
            })}
        </div>
    }
    renderMain = () => {
        const { order } = this.props;
        const packages = {
            cases:[35, 40, 50],
            bins: [30, 40, 130],
            Vflats: [5, 5],
            additional: [15, 25, 30, 40, 12, 40]
        }
        console.log(order.bins)
        return (
            <div id="middleContainer" class="primary-bg-color row align-items-center">
    <div class="col-md-12 container">
      <h4 class="text-white text-center">Confirm your order</h4>
      <br />
        <div class="row middleBox">
            <div class="col-md-4 d-none d-md-block secondary-bg-color rightSide">
                <br /><br /><br /><br />
                <h1 class="text-center text-white logo-text">ARC</h1>
                <p class="text-center text-white">The Messenger Pricing System</p>
                </div>
          <div class="col-md-8 col-sm-12 col-xs-12 d-block white-bg-color">
            <div class="row align-items-center">
              <div class="col-md-12 container leftSide">
                <div class="scrollable-content">
                <h5 class="text-center">Review order details</h5>
                <Link to="/orders" class="float-right"><strong>Back to Order List</strong></Link>
                <div class="form-group">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th colspan="2" scope="col"><h5>Order Details</h5></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">Customer Name:</th>
                                    <td>{order.customer_name}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Service:</th>
                                      <td>{order.service}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Customer Address:</th>
                                      <td>{order.customer_address}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Our Address:</th>
                                      <td>{order.our_address}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Confirmed:</th>
                                      <td>{order.confirmed ? 'True': 'False'}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Price:</th>
                                      <td>{order.price}</td>
                                  </tr>
                                  <tr>
                                      <th scope="row">Notes:</th>
                                      <td>{order.notes}</td>
                                  </tr>
                                  <tr>
                                      <th colspan="2" scope="row"><h5>Packages</h5></th>
                                  </tr>
                                  {
                                    order.bins.quantity !== 0 &&
                                    <tr>
                                      <th scope="row">Bins:</th>
                                      <td>${(order.bins.quantity * packages.bins[order.bins.type])}</td>
                                  </tr>
                                  }
                                  {
                                    order.cases.quantity !== 0 &&
                                    <tr>
                                      <th scope="row">Cases:</th>
                                      <td>${(order.cases.quantity * packages.cases[order.cases.type])}</td>
                                  </tr>
                                  }
                                  {
                                    order.Vflats.quantity !== 0 &&
                                    <tr>
                                      <th scope="row">Vflats:</th>
                                      <td>${(order.Vflats.quantity * packages.Vflats[order.Vflats.type])}</td>
                                  </tr>
                                  }
                                  {
                                    order.additional.quantity !== 0 &&
                                    <tr>
                                      <th scope="row">additional:</th>
                                      <td>${(order.additional.quantity * packages.additional[order.additional.type])}</td>
                                  </tr>
                                  }
                                  <tr>
                                      <th scope="row">Distance:</th>
                                      <td>{order.distance}</td>
                                  </tr>
                                </tbody>
                              </table>
                        </div>
                    </div>
                <div>
                    <button onClick={this.handleConfirmOrder} class="btn btn-primary btn-sm">Confirm Order</button>
                    &nbsp;&nbsp;
                    <button onClick={this.handleUpdateOrder} class="btn btn-primary btn-sm">Edit Order</button>
                    &nbsp;&nbsp;
                    <button onClick={this.handleDeleteOrder} class="btn btn-primary btn-sm">Delete Order</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
        );
    };

    renderBody = () => {
        const  {
            isLoadingDetail,
            loadingError,
            order
        } = this.props;

        switch (true) {
            case isLoadingDetail:
            case Object.keys(order).length === 0:
                return (<p>Loading....</p>);
            case loadingError.length !== 0:
                return <p>{loadingError}</p>;
            default:
                return this.renderMain();
        }
    };

    render() {
        return <div>{ this.renderBody() }</div>
    }
}

function mapStateToProps({ orders }) {
    return {
        order: orders.detail,
        isLoadingDetail: orders.isLoadingDetail,
        loadingError: orders.loadingDetailError,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrder: (id) => {
            return dispatch(getOrderAction(id));
        },
        deleteOrder: id => dispatch(deleteOrderAction(id)),
        confirmOrder: (email, id) => dispatch(confirmOrderAction(email, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
