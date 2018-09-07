import React, { Component } from 'react';
import './../styles/eventCard.css'
import './../styles/bootstrap-social.css'
import { getEventView } from '../redux/actions/actions';

class EventCard extends Component {

    render() {

        let event = this.props.event || {}
        let days = event.days || []
        let dispatch = this.props.dispatch || {}

        return (
            <div className="col-sm-6  mt-5">
                <div className="card text-center eventCard">
                    <div className="card-header text-left">
                        <span>{days}</span>
                        <a target="_blank" className="btn btn-secondary float-right" href={"https://twitter.com/intent/tweet?text=Iré al " + event.title + "@ FECHA DEL EVENTO LINK DEL EVENTO"}>
                            <i className="fa fa-twitter bg-secondary"></i>  Tweet </a>

                    </div>
                    <div className="card-body align-bottom">
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <h4 className="card-title text-left">{event.title}</h4>
                    </div>
                    <div className="card-footer text-muted">
                        <button className="btn btn-secondary float-left" onClick={() => dispatch(getEventView(event._id))}>
                            View</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default EventCard;