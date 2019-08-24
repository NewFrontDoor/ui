import React from 'react';
import Elderswrapper from './elders-wrapper';
import Deeks from './deeks';
import Bomwrapper from './bom-wrapper';
import Staffwrapper from './staff-wrapper';

export default function PeopleGroup({ apiUrl }) {
    return (
        <div>
            <Elderswrapper apiUrl={apiUrl} email="elders@cornerstonehobart.com" title="Elders" />
            <Deeks apiUrl={apiUrl} email="" title="Deacons" />
            <Bomwrapper apiUrl={apiUrl} email="bom@cornerstonehobart.com" title="Board of Management" />
            <Staffwrapper apiUrl={apiUrl} email='' title="Church Staff" />
        </div>
    );
}