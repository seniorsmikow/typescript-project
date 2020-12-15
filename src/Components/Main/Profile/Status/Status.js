import React from 'react';
import classes from './Status.module.css';

class Status extends React.Component {

    state = {
        editMode: false,
        status: this.props.status,
    }

    directEditMode = () => {
        this.setState(
            {
                editMode: true,
            }
        );
    }

    redirectEditMode = () => {
        this.setState(
            {
                editMode: false
            }
        );
        this.props.deactivate(this.state.status);
    };

    changeStatus = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            });
        }
    }

    render() {

        return (
            <div className={classes.main}>
                {!this.state.editMode &&
                    <span onDoubleClick={this.directEditMode} >
                        {this.props.status || "not status"}
                    </span>
                }
                {this.state.editMode &&
                    <input autoFocus={true} onBlur={this.redirectEditMode} value={this.state.status} onChange={this.changeStatus} />
                }
            </div>
        )
    }
}

export default Status;