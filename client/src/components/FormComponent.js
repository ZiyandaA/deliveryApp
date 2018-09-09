import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    updateOrderAction,
    createOrderAction,
    getOrderAction
} from '../store/modules/orders';

import moment from 'moment'

import '../styles/index.css';

const mainBGColor = '#024fa2';

const StoreLocation = ({background, name, address, onSelect, selected}) => {
    return <div
        onClick={() => onSelect(address)}
        style={{
            display: 'inline-block',
            width: 200,
            marginRight: 10,
            cursor: 'pointer'
        }}
    >
        <div
            style={{
                padding: 10,
                background: selected ? '#01366f' : mainBGColor,
                color: 'white',
                fontSize: 18,
            }}

        >{name}</div>
        <div
            className="location-img"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                color: 'red',
                padding: '20px 10px',
                fontSize: 20,

            }}
        >{address}</div>

    </div>
}

const FormItem = ({name, onChangeOption, onChange, label, index, options =[], formData }) => {
    //console.log(formData[name], `formData.${name}`)
    const { quantity, type } = formData[name];
    // console.log(quantity);
    return (<tr>
        <th scope="row">
        {label}</th>
        <td>
        <select
            value={type}
            name={name}
            onChange={onChangeOption}
        >
            {/* <option disabled selected value="default">Select a {label}</option> */}
            {options.map(({label, value}, i) => <option value={value} key={i}>{label}</option>)}

        </select>
        </td>
        <td>
        <input
            className="my-form-control quantity"
            type={'number'}
            name={name}
            onChange={onChange}
            value={quantity}
        />
        </td>
    </tr>)
}

const formItemProps = [
    {
        name:'bins',
        label: 'Bins',
        options: [
            {
                value: "0",
                label: "One bin - $30"
            },
            {
                value: "1",
                label: "Two Bins - $40"
            },
            {
                value: "2",
                label: "Three Bins and over Truck jobs - $130/hr"
            }
        ]
    },
    {
        name:'cases',
        label: 'Cases',
        options: [
            {
                value: "0",
                label: "One Case - $35"
            },
            {
                value: "1",
                label: "Two Cases - $40"
            },
            {
                value: "2",
                label: "Three Cases - $50"
            }
        ]
    },
    {
        name:'Vflats',
        label: 'Vflats',
        options: [
            {
                value: "0",
                label: "VFlats, magliners, bead boards, flags - $5"
            },
            {
                value: "1",
                label: "Anything too long - $5"
            },
        ]
    },
    {
        name:'additional',
        label: 'Additional Fees',
        options: [
            {
                value: "0",
                label: "Rush NYC - $15'"
            },
            {
                value: "1",
                label: "Rush BK - $25',"
            },
            {
                value: "2",
                label: "Super Rush NYC - $30',"
            },
            {
                value: "3",
                label: "Super Rush BK - $40'"
            },
            {
                value: "4",
                label: "No pick up fee - $12"
            },
            {
                value: "5",
                label: "Waiting time per hr - $40"
            },
        ]
    },
];

class FormComponent extends Component {
    formData = {
        service: "pick-up",
        customer_name: "John Smith ",
        notes: "",
        customer_address: "370 19th Street Brookly NY 11215",
        our_address: "50 West 17th Street New York 10011",
        bins:  {
            type: "0",
            quantity: 0
        },
        cases: {
            type: "1",
            quantity: 0
        },
        Vflats: {
            type: "1",
            quantity: 0
        },
        additional: {
            type: "3",
            quantity: 0
        },
        date_time: "2018-08-31"
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.formData,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeOption = this.handleChangeOption.bind(this);
        this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount () {
        const {mode, orderId, order, getOrder } = this.props;
       // console.log(order._id, orderId);
        if (mode === 'edit') {

            if(order._id !== orderId) {
                getOrder(orderId);
            } else {
                this.addOrderInfoToState();
            }

        }
    }

    componentDidUpdate(prevProps) {
        if (Object.keys(this.props.order).length !== 0) {
            if (JSON.stringify(prevProps.order) !== JSON.stringify(this.props.order)) {
                this.addOrderInfoToState();
            }
        }
    }

    addOrderInfoToState = () => {
        const {
            customer_name,
            service,
            notes,
            customer_address,
            our_address,
            bins,
            cases,
            Vflats,
            additional,
            date_time
        } = this.props.order;

        const data = {
            customer_name,
            service,
            notes,
            customer_address,
            our_address,
            date_time: moment(date_time).format('YYYY-MM-DD'),
            bins: {
                type: `${bins.type}`,
                quantity: bins.quantity
            },
            cases: {
                type: `${cases.type}`,
                quantity: cases.quantity
            },
            Vflats: {
                type: `${Vflats.type}`,
                quantity: Vflats.quantity
            },
            additional: {
                type: `${additional.type}`,
                quantity: additional.quantity
            }
        };
        this.setState({...data})
    }

    // component
    async submit(ev) {
        const {
            service,
            customer_name,
            notes,
            customer_address,
            our_address,
            bins,
            cases,
            Vflats,
            additional,
            date_time,
        } = this.state;


        ev.preventDefault();

        const formData = {
            service,
            customer_name,
            notes,
            customer_address,
            our_address,
            bins,
            cases,
            Vflats,
            additional,
            date_time,
        };
        try {
            const {mode, orderId } = this.props;
            let res;

            if (mode === 'edit') {
                res = await this.props.updateOrder(orderId, formData);
            } else {
                res = await this.props.createOrder(formData);
            }
            this.props.history.push(`/orders/${res.order._id}`);
        } catch (e) {
            console.log(e)
        }

    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleChangeOption(e) {
        this.setState({
            [e.target.name]: {...this.state[e.target.name], type: e.target.value}
        })
    }

    handleChangeQuantity(e) {
        // const quantity = parseInt(e.target.value, 10) ? parseInt(e.target.value, 10) : 0;
        this.setState({
            [e.target.name]: {
                ...this.state[e.target.name],
                quantity: e.target.value
            }
        })
    }

    onLocationChange = (address) => {
        this.setState({
            our_address: address,
        })
    };

    render() {
        const {
            customer_name, notes, date_time, service,
            our_address,
            customer_address
        } = this.state;

        const minDateStr = moment().format('YYYY-MM-DD');
        const { mode, order, isLoadingDetail }  = this.props;

        if (mode=== 'edit' && Object.keys(order).length === 0) {
            return <p>Loading...</p>
        }

        return(
            <div id="middleContainer" className="primary-bg-color">
                <div className="first-container">
                    <h4 className="my-text-white my-text-center">Place an order</h4>
                    <div className="middleBox">
                        <div className="secondary-bg-color rightSide the-right">
                            <h1 className="my-text-center my-text-white logo-text">ARC</h1>
                            <p className="my-text-center my-text-white">The Messenger Pricing System</p>
                        </div>
                        <div className="white-bg-color left-box">
                            <div className="left-box-inner">
                                <div className="leftSide">
                                    <h5 className="text-center fill-form">Fill form below</h5>
                                    <div className="scrollable-content">
                                        <form
                                            onSubmit={this.submit}
                                            style={{
                                                background: 'white', padding: 15,marginTop: 10
                                            }}
                                        >
                                            <div>
                                                <div className="my-form-group select">
                                                    <label htmlFor="emailInput">Select Service:</label>
                                                    <select
                                                        name={'service'}
                                                        value={service}
                                                        onChange={this.handleChange}
                                                        required
                                                    >
                                                        <option value="delivery">Delivery</option>
                                                        <option value="pick-up">Pick Up</option>
                                                    </select>
                                                </div>
                                                <div className="my-form-group">
                                                    <label htmlFor="customerNameInput">Customer Name:</label>
                                                    <input
                                                        className="my-form-control"
                                                        type="text"
                                                        value={customer_name}
                                                        size='50'
                                                        name='customer_name'
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </div>
                                            <div>
                                            <div className="my-form-group">
                                                <label>Select Location:</label>
                                                <div className="store-location">
                                                    <StoreLocation
                                                        name={'Manhattan'}
                                                        address={'50 West 17th Street New York 10011'}
                                                        background={'http://www.yellowmaps.com/maps/img/US/political/Minnesota-political-map-796.jpg'}
                                                        onSelect={this.onLocationChange}
                                                        selected={our_address === '50 West 17th Street New York 10011'}
                                                    />
                                                    <StoreLocation
                                                        name={'Brooklyn'}
                                                        address={'370 19th Street Brookly NY 11215'}
                                                        background={'http://www.yellowmaps.com/maps/img/US/political/Minnesota-political-map-796.jpg'}
                                                        onSelect={this.onLocationChange}
                                                        selected={our_address === '370 19th Street Brookly NY 11215'}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="my-form-group">
                                                    <label htmlFor="customerNameInput">Customer Address: {customer_address}</label>
                                                    <input
                                                        className="my-form-control"
                                                        id="customerAddressInput"
                                                        type="text"
                                                        value={customer_address}
                                                        name='customer_address'
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            </div>
                                            <div className="my-form-group">
                                                <h5>Select Packages</h5>
                                                <div className="my-responsive-table">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Items</th>
                                                                <th scope="col">Quantity</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {formItemProps.map(({label, name, options}, i) => {
                                                                return <FormItem
                                                                    key={i}
                                                                    label={label}
                                                                    name={name}
                                                                    onChange={this.handleChangeQuantity}
                                                                    onChangeOption={this.handleChangeOption}
                                                                    options={options}
                                                                    index={i}
                                                                    formData={this.state}
                                                                />
                                                            })}
                                                            <tr>
                                                                <th scope="row">Order Date</th>
                                                                <td colSpan="2">
                                                                    <input
                                                                        type="date"
                                                                        name="date_time"
                                                                        className="my-form-control"
                                                                        value={date_time}
                                                                        onChange={this.handleChange}
                                                                        min={minDateStr}
                                                                        required
                                                                    />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Notes</th>
                                                                <td colSpan="2">
                                                                    <textarea
                                                                        name="notes"
                                                                        value={notes}
                                                                        className="my-form-control"
                                                                        onChange={this.handleChange}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="form-button">
                                                <button type="submit" className="my-button text-center">
                                                    {mode === 'edit' ? 'Update': 'Submit'}
                                                </button>
                                                {
                                                    isLoadingDetail && <p>Loading...</p>
                                                }
                                            </div>
                                        </form>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ orders }) {
    return {
        order: orders.detail,
        isLoadingDetail: orders.isLoadingDetail
    }
};

function mapDispatchToProps(dispatch) {
    return {
        createOrder: order => dispatch(createOrderAction(order)),
        getOrder: id => dispatch(getOrderAction(id)),
        updateOrder: (id, order) => dispatch(updateOrderAction(id, order))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(FormComponent));
