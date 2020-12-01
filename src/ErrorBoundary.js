import { findAllByTestId } from '@testing-library/react';
import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

class ErrorBoundary extends Component{
    state={
        error:false
    };

    componentDidCatch(error, info){
        console.log('Error catch');
        console.log({
            error,info
        });
        this.setState({
            error:true
        });
        if(process.env.NODE_ENV === 'production'){
            Sentry.captureException(error, { extra: info });
        }
    }

    render(){
        if(this.state.error){
            return <h1>error!</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;