import * as React from 'react';
import './List.css';

export interface ListState {
    items: string[];
}

export class List extends React.Component<{ items: string[] }, ListState> {
    constructor(props: { items: string[] }) {
        super(props);
        this.state = {
            items: props.items
        };
    }

    render() {
        return (
            <ul>
                {this.state.items.map((name, i) => (<li key={i}>{name}</li>))}
            </ul>
        );
    }
}