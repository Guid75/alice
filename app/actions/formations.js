'use strict';

import request from 'superagent';

export const REQUEST_FORMATIONS = 'REQUEST_FORMATIONS';
export const RECEIVE_FORMATIONS = 'RECEIVE_FORMATIONS';
export const FILTER_FORMATIONS = 'FILTER_FORMATIONS';
export const ADD_FORMATION_REQUEST = 'ADD_FORMATION_REQUEST';
export const ADD_FORMATION_RESPONSE = 'ADD_FORMATION_RESPONSE';
export const ADD_FORMATION_ERROR = 'ADD_FORMATION_ERROR';
export const REMOVE_FORMATION_REQUEST = 'REMOVE_FORMATION_REQUEST';
export const REMOVE_FORMATION_RESPONSE = 'REMOVE_FORMATION_RESPONSE';
export const REMOVE_FORMATION_ERROR = 'REMOVE_FORMATION_ERROR';
export const FORMATION_EDITION_MODAL_SHOW = 'FORMATION_EDITION_MODAL_SHOW';
export const FORMATION_EDITION_MODAL_CLOSE = 'FORMATION_EDITION_MODAL_CLOSE';

function requestFormations() {
    return {
        type: REQUEST_FORMATIONS
    };
}

function receiveFormations(formations) {
    return {
        type: RECEIVE_FORMATIONS,
        formations: formations
    };
}

export function fetchFormations() {
    return dispatch => {
        dispatch(requestFormations());
        request
        .get('/api/v1/formations')
        .end((err, res) =>  {
            if (err) {
                throw err;
            }
            dispatch(receiveFormations(res.body));
        });
    };
};

export function filterFormations(filter) {
    return {
        type: FILTER_FORMATIONS,
        filter: filter
    }
};

function addFormationRequest(formation) {
    return {
        type: ADD_FORMATION_REQUEST,
        formation: formation
    };
}

function addFormationResponse(formation) {
    return {
        type: ADD_FORMATION_RESPONSE,
        formation: formation
    };
}

function addFormationError(err) {
    return {
        type: ADD_FORMATION_ERROR,
        error: err
    };
}

export function addFormation(formation) {
    return dispatch => {
        dispatch(addFormationRequest(formation));
        return new Promise((resolve, reject) => {
            request
            .post('/api/v1/formations')
            .set('Content-Type', 'application/json')
            .send(formation)
            .end((err, res) => {
                if (err) {
                    dispatch(addFormationError(err));
                    reject(err);
                    return;
                }
                dispatch(addFormationResponse(res.body));
                resolve(res.body);
            });
        });
    };
}

function removeFormationRequest(id) {
    return {
        type: REMOVE_FORMATION_REQUEST,
        id: id
    };
}

function removeFormationResponse(id) {
    return {
        type: REMOVE_FORMATION_RESPONSE,
        id: id
    };
}

function removeFormationError(id) {
    return {
        type: REMOVE_FORMATION_ERROR,
        id: id
    };
}

export function removeFormation(id) {
    return dispatch => {
        dispatch(removeFormationRequest(id));
        return new Promise((resolve, reject) => {
            request
            .del('/api/v1/formations/' + id)
            .end((err, res) => {
                if (err) {
                    dispatch(removeFormationError(err));
                    reject(err);
                    return;
                }
                dispatch(removeFormationResponse(id));
                resolve(res.body);
            });
        });
    }
}
