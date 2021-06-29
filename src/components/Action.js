import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export default class Action extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const url = _.get(action, 'url');
        const label = _.get(action, 'label');
        const style = _.get(action, 'style', 'link');
        const hasIcon = _.get(action, 'has_icon');
        const icon = _.get(action, 'icon');
        const iconPos = _.get(action, 'icon_position', 'right');
        const classes = classNames({
            'btn': style === 'primary' || style === 'secondary' || (hasIcon && icon),
            'btn--primary': style === 'primary',
            'btn--secondary': style === 'secondary',
            'btn--icon': hasIcon && icon && iconPos === 'center',
            'btn--clear': hasIcon && icon && style === 'link'
        });
        const newWindow = _.get(action, 'new_window');
        const noFollow = _.get(action, 'no_follow');
        const attrs = {};
        if (newWindow) {
            attrs.target = '_blank';
        }
        if (newWindow || noFollow) {
            attrs.rel = [(newWindow ? 'noopener' : ''), (noFollow ? 'nofollow' : '')].filter(Boolean).join(' ');
        }

        const sbFieldPath = `.label${hasIcon && icon ? '#span[1]' : ''} .url#@href .icon#`;

        return (
            <Link href={withPrefix(url)} {...attrs} className={classes} data-sb-field-path={hasIcon && icon ? "label#span[1]" : "label"}>
                {(hasIcon && icon) ? (
                    <React.Fragment>
                        <Icon icon={icon} />
                        <span
                            className={classNames({
                                'order-first': iconPos === 'right',
                                'sr-only': iconPos === 'center'
                            })}
                            data-sb-field-path=".icon"
                        >
                            {label}
                        </span>
                    </React.Fragment>
                ) :
                    label
                }
            </Link>
        );
    }
}
