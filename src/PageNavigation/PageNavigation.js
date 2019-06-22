import React from 'react';
import './PageNavigation.css';

class PageNavigation extends React.Component {
    render() {
        return (
            <nav>
                <div className='page_list_container'>
                    <ul className='page_list'>
                        {this.props.pages.map((p, i) => {
                            return <li className='page_list_number' key={i} onClick={() => this.props.requestPageNumber(p)}><a className='page_list_link' href='#'>{p}</a></li>
                        })}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default PageNavigation;