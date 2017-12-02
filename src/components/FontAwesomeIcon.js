import React from 'react';
import className from 'classname';

export default class FontAwesomeIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let classes = {
            'fa': true,
            'fa-spin': this.props.spin
        };
        classes['fa-' + this.props.icon] = true;
        if (this.props.size) {
            classes['fa-' + this.props.size] = true;
        }
        return (<i style={this.props.style}
                   onClick={this.props.onClick}
                   className={className(classes, this.props.className)}/>);
    }
}

FontAwesomeIcon.defaultProps = {icon: '', size: false, spin: false};
