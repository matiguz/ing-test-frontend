import React, { Component } from 'react';
import './../styles/highlight.css'
import './../styles/bootstrap-social.css'

class EventHiglight extends Component {

    render() {

        let event = this.props.event || {}
        return (
            <div className="mt-4">
                <div className="row mt-4 ml-2">
                    <div className="col-sm-4">
                        <img src={event.picture} width="100%"/>
                    </div>
                    <div className="col-sm-8">
                        <strong>{event.title}</strong>
                        <br/>
                        <small> <span className="text-muted">{event.days}</span></small>
                        <br/>
                        <small> <strong>{event.place}</strong></small>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default EventHiglight;