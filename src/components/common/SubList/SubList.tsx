import * as React from 'react';

import { List } from '../List/List';

export class SubList extends List {
    render() {
        let prev = super.render();
        let retEl = (
            <div>
                {prev}
                <b>att the end</b>
            </div>
        );
        return retEl;
    }
}