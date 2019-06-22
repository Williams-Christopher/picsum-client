import React from 'react';
import './PageNavigation.css';

class PageNavigation extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    {this.props.pages.map((p, i) => {
                        return <li key={i} onClick={() => this.props.requestPageNumber(p)}>{p}</li>
                    })}
                </ul>
            </nav>
        );
    }
}

export default PageNavigation;