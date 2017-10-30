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

import React from 'react';
import { _t } from 'matrix-react-sdk-vj/lib/languageHandler';
import DateUtils from 'matrix-react-sdk-vj/lib/DateUtils';

function getdaysArray() {
    return [
        _t('Sunday'),
        _t('Monday'),
        _t('Tuesday'),
        _t('Wednesday'),
        _t('Thursday'),
        _t('Friday'),
        _t('Saturday'),
    ];
}

module.exports = React.createClass({
    displayName: 'DateSeparator',
    render: function() {
        var date = new Date(this.props.ts);
        var today = new Date();
        var yesterday = new Date();
        var days = getdaysArray();
        yesterday.setDate(today.getDate() - 1);
        var label;
        if (date.toDateString() === today.toDateString()) {
            label = _t('Today');
        } else if (date.toDateString() === yesterday.toDateString()) {
            label = _t('Yesterday');
        } else if (today.getTime() - date.getTime() < 6 * 24 * 60 * 60 * 1000) {
            label = days[date.getDay()];
        } else {
            label = DateUtils.formatFullDate(date, this.props.showTwelveHour);
        }

        return ( <
            h2 className = "mx_DateSeparator" > { label } < /h2>
        );
    }
});