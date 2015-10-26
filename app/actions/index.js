'use strict';

export const SELECT_TAB = 'SELECT_TAB';

export function selectTab(id) {
    return {
        type: SELECT_TAB,
        tab: id
    };
}
