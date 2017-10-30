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

import React from 'react';
import DateUtils from 'matrix-react-sdk-vj/lib/DateUtils';

module.exports = React.createClass({
    displayName: 'MessageTimestamp',

    propTypes: {
        showTwelveHour: React.PropTypes.bool,
    },

    render: function() {
        const date = new Date(this.props.ts);
        return ( <
            span className = "mx_MessageTimestamp"
            title = { DateUtils.formatFullDate(date, this.props.showTwelveHour) } > { DateUtils.formatTime(date, this.props.showTwelveHour) } <
            /span>
        );
    },
});