/*
Copyright 2015, 2016 OpenMarket Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var dis = require('matrix-react-sdk-vj/lib/dispatcher');

module.exports = React.createClass({
    displayName: 'RoomTooltip',

    propTypes: {
        // Alllow the tooltip to be styled by the parent element
        className: React.PropTypes.string.isRequired,
        // The tooltip is derived from either the room name or a label
        room: React.PropTypes.object,
        label: React.PropTypes.string,
    },

    // Create a wrapper for the tooltip outside the parent and attach it to the body element
    componentDidMount: function() {
        this.tooltipContainer = document.createElement("div");
        this.tooltipContainer.className = "mx_RoomTileTooltip_wrapper";
        document.body.appendChild(this.tooltipContainer);

        this._renderTooltip();
    },

    componentDidUpdate: function() {
        this._renderTooltip();
    },

    // Remove the wrapper element, as the tooltip has finished using it
    componentWillUnmount: function() {
        dis.dispatch({
            action: 'view_tooltip',
            tooltip: null,
            parent: null,
        });

        ReactDOM.unmountComponentAtNode(this.tooltipContainer);
        document.body.removeChild(this.tooltipContainer);
    },

    _renderTooltip: function() {
        var label = this.props.room ? this.props.room.name : this.props.label;

        // Add the parent's position to the tooltips, so it's correctly
        // positioned, also taking into account any window zoom
        // NOTE: The additional 6 pixels for the left position, is to take account of the
        // tooltips chevron
        var parent = ReactDOM.findDOMNode(this);
        var style = {};
        style.top = parent.getBoundingClientRect().top + window.pageYOffset;
        style.left = 6 + parent.getBoundingClientRect().right + window.pageXOffset;
        style.display = "block";

        var tooltip = ( <
            div className = "mx_RoomTooltip"
            style = { style } >
            <
            div className = "mx_RoomTooltip_chevron" > < /div> { label } <
            /div>
        );

        // Render the tooltip manually, as we wish it not to be rendered within the parent
        this.tooltip = ReactDOM.render(tooltip, this.tooltipContainer);

        // Tell the roomlist about us so it can manipulate us if it wishes
        dis.dispatch({
            action: 'view_tooltip',
            tooltip: this.tooltip,
            parent: parent,
        });
    },

    render: function() {
        // Render a placeholder
        return ( <
            div className = { this.props.className } >
            <
            /div>
        );
    }
});