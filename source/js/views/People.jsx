import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { logout } from '../actions/login';

class People extends Component {
    
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool,
        people: PropTypes.object,
        // from react-redux connect
        dispatch: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.mylogout = this.mylogout.bind(this);
    }
    
    mylogout(){        
        const { dispatch, history } = this.props;
        dispatch(logout());
        // return <Redirect to="/" />
        history.push('/');
    }

    componentWillMount() {
        const {
            dispatch,
            people,
        } = this.props;

        if (!people) {
            // dispatch(getPeople());
        }

        // dispatch(logout);
    }

    renderPeople() {
        const {
            people,
        } = this.props;

        return people.results.map(person => {
            return (
                <div key={ person.url } className='People-person'>
                    <h3>{ person.name }</h3>
                    <div>Height: { person.height }</div>
                    <div>Mass: { person.mass }</div>
                    <div>Eye color: { person.eye_color }</div>
                    <div>Hair color: { person.hair_color }</div>
                    <div>Birth year: { person.birth_year }</div>
                </div>
            );
        });
    }

    render() {
        const {
            loading,
            error,
            people,
        } = this.props;

        return (
            <div className='People'>            
                <h1>People</h1>
                <a onClick={this.mylogout}>Click Here</a>
                { loading && <div>Loading people...</div> }
                { error && error.toString() }
                <div className='People-list'>
                    { people && this.renderPeople() }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: state.people.get('error'),
    loading: state.people.get('loading'),
    people: state.people.get('people'),
})

export default connect(mapStateToProps)(People);