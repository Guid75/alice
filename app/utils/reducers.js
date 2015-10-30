import Immutable from 'immutable';

function fetchActionHandlers(level, path, actionToReducer) {
    let key;
    for (key in level) {
        if (level.hasOwnProperty(key)) {
            switch (typeof level[key]) {
                case 'object':
                fetchActionHandlers(level[key], path.concat(key), actionToReducer);
                break;
                case 'function':
                actionToReducer[key] = {
                    path: path,
                    handler: level[key]
                };
                break;
                default:
                throw new Error('We expect a domain reducers object of a reducer function');
                break;
            }
        }
    }
}

function combineReducers(reducers) {
    let actionToReducer = {};

    fetchActionHandlers(reducers, [], actionToReducer);

    return (state, action) => {
        const reducer = actionToReducer[action.type];
        if (!reducer) {
            if (action.type !== '@@redux/INIT') {
                console.warn(`No reducer found for this action ${action.type}`);
            }
            return state;
        }
        if (reducer.path) {
            return state.updateIn(reducer.path, domain => reducer.handler(domain, action));
        }
        return reducer.handler(state, action);
    };
}

export default combineReducers;
