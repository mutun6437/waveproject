import * as React from 'react';


export interface State {}

export interface Props {

}

export class ReactSample extends React.Component<Props, State> {
    constructor () {
        super();
    }
    render () {
        return (
            <li>
              Sample
            </li>
        );
    }
}
