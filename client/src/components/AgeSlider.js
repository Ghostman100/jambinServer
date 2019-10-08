import {withStyles} from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const AgeStyles = withStyles({
    root: {
        color: '#FC3067',
        height: 6,
        // paddingRight: 16
    },
    thumb: {
        height: 14,
        width: 14,
        backgroundColor: '#FBFBFB',
        border: '1px solid #BEBEBE',
        marginTop: -4,
        marginLeft: -7,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 6,
        borderRadius: 4,
    },
    rail: {
        background: '#333333',
        height: 6,
        borderRadius: 4,
        opacity: 0.2
    }
})(Slider);

export default function AgeSlider(props) {
    return <AgeStyles value={props.value}
                      min={18}
                      onChangeCommitted={props.filter}
                      onChange={props.onChange}/>
}
