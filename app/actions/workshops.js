'use strict';

import request from 'superagent';

export const REQUEST_WORKSHOPS = 'REQUEST_WORKSHOPS';
export const RECEIVE_WORKSHOPS = 'RECEIVE_WORKSHOPS';
export const ADD_WORKSHOP_REQUEST = 'ADD_WORKSHOP_REQUEST';
export const ADD_WORKSHOP_RESPONSE = 'ADD_WORKSHOP_RESPONSE';
export const ADD_WORKSHOP_ERROR = 'ADD_WORKSHOP_ERROR';
export const REMOVE_WORKSHOP_REQUEST = 'REMOVE_WORKSHOP_REQUEST';
export const REMOVE_WORKSHOP_RESPONSE = 'REMOVE_WORKSHOP_RESPONSE';
export const WORKSHOP_EDITION_MODAL_SHOW = 'WORKSHOP_EDITION_MODAL_SHOW';
export const WORKSHOP_EDITION_MODAL_CLOSE = 'WORKSHOP_EDITION_MODAL_CLOSE';

function requestWorkshops() {
    return {
        type: REQUEST_WORKSHOPS
    };
}

function receiveWorkshops(workshops) {
    return {
        type: RECEIVE_WORKSHOPS,
        workshops: workshops
    };
}

export function fetchWorkshops() {
    return dispatch => {
        dispatch(requestWorkshops());
        request
        .get('/api/v1/workshops')
        .end((err, res) =>  {
            if (err) {
                throw err;
            }
            dispatch(receiveWorkshops(res.body));
        });
    };
};

function addWorkshopRequest(workshop) {
    return {
        type: ADD_WORKSHOP_REQUEST,
        workshop: workshop
    };
}

function addWorkshopResponse(workshop) {
    return {
        type: ADD_WORKSHOP_RESPONSE,
        workshop: workshop
    };
}

function addWorkshopError(err) {
    return {
        type: ADD_WORKSHOP_ERROR,
        error: err
    };
}

export function addWorkshop(workshop) {
    return dispatch => {
        dispatch(addWorkshopRequest(workshop));
        return new Promise(function (resolve, reject) {
            request
            .post('/api/v1/workshops')
            .set('Content-Type', 'application/json')
            .send(workshop)
            .end((err, res) => {
                if (err) {
                    dispatch(addWorkshopError(err));
                    reject(err);
                    return;
                }
                dispatch(addWorkshopResponse(res.body));
                resolve();
            });
        });
    };
}

function removeWorkshopRequest(id) {
    return {
        type: REMOVE_WORKSHOP_REQUEST,
        id: id
    };
};

function removeWorkshopResponse(id) {
    return {
        type: REMOVE_WORKSHOP_RESPONSE,
        id: id
    };
};

export function removeWorkshop(id) {
    console.log('remove', id);
    return dispatch => {
        dispatch(removeWorkshopRequest(id));
        request
        .del('/api/v1/workshops/' + id)
        .end((err, res) => {
            dispatch(removeWorkshopResponse(id));
        });
    };
}

export function workshopEditionModalShow() {
    return {
        type: WORKSHOP_EDITION_MODAL_SHOW
    };
}

export function workshopEditionModalClose() {
    return {
        type: WORKSHOP_EDITION_MODAL_CLOSE
    };
}
