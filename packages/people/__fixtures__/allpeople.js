import React from 'react'
import People from '../allpeople';
export default {
    component: People,
    props: {
        apiUrl: 'https://cornerstoneapi.newfrontdoor.org/api/all-people',
        groups: [{ title: 'Elders', email: 'elders@cornerstonehobart.com', type: 'Elder' }, { title: 'Deacons', email: '', type: 'Deacon' }, { title: 'Board of Management', email: 'bom@cornerstonehobart.com', type: 'BOM Member' }, { title: 'Church Staff', email: '', type: 'Staff Member' }]
    }
};
