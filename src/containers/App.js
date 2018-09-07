// containers/App.js

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import EventCard from '../components/EventCard'
import EventForm from '../components/EventForm'
import EventHighlight from '../components/EventHighlight'
import Footer from '../components/Footer'
import { getEvents, getEventsHighlighted } from '../redux/actions/actions';
import EventView from '../components/EventView';
import Pagination from "react-js-pagination";
import './../styles/app.css'
import './../styles/bootstrap/css/bootstrap.css'

class App extends Component {

  constructor() {
    super();
    this.state = {
      activePage: 1,
      eventsPerPage: 6,
      total: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  componentWillMount() {
    // super();
    this.props.dispatch(getEvents());
    this.props.dispatch(getEventsHighlighted());
    const { events } = this.props;
    this.setState({ total: events.length })
  }

  render() {
    const { dispatch, events, eventsHighlighted, isAuthenticated, isAddEvent, errorMessage, eventView } = this.props
    let cant = this.props.events.length;
    return (
      <div className="content-fluid container-body">
        <Navbar
          isAuthenticated={isAuthenticated}
          isAddEvent={isAddEvent}
          errorMessage={errorMessage}
          dispatch={dispatch}
          eventView={eventView}
        />
        <div className='container'>
          {Object.entries(eventView).length !== 0 ?
            <EventView
              event={eventView}
              dispatch={dispatch}
            /> : <div>
                  {isAddEvent ?
                    <EventForm
                      dispatch={dispatch}
                    />
                    :
                    <div className="row">
                      <div className="col-sm-8">
                        <div className="row">
                          {events.map((event, key) => {
                            if ((this.state.eventsPerPage * this.state.activePage - this.state.eventsPerPage - 1 < key) &&
                              (this.state.eventsPerPage * this.state.activePage > key)) {
                                return <EventCard event={event}
                                  dispatch={dispatch} />
                              }
                            })
                          }
                        </div>
                          <div className="row">
                            {<Pagination
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.eventsPerPage}
                              totalItemsCount={cant}
                              pageRangeDisplayed={5}
                              onChange={this.handlePageChange}
                            />}
                          </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="mt-4 text-center">
                          <h1><u>Today's highlight</u></h1>
                        </div>
                          {eventsHighlighted.map((event, key) => {
                                return <EventHighlight event={event}
                                  dispatch={dispatch} />
                            })
                          }
                      </div>              
                    </div>                    
                    }
                </div>
          }
        </div>
        <Footer
          isAuthenticated={isAuthenticated}
          dispatch={dispatch}
        />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

  const { events, auth } = state
  const { isAuthenticated, errorMessage } = auth
  return {
    events: events.events,
    eventsHighlighted: events.eventsHighlighted,
    eventView: events.eventView,
    isAddEvent: events.isAddEvent,
    isAuthenticated,
    errorMessage,
  }
}

export default connect(mapStateToProps)(App)