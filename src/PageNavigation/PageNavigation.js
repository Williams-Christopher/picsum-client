import React from 'react';
import './PageNavigation.css';

class PageNavigation extends React.Component {
    render() {
        return (
            <nav>
                <div className='page_list_container'>
                    <ul className='page_list'>
                        <li className='page_list_number' key='-1' onClick={() => this.props.requestPageNumber(1)}><a className='page_list_link' href='#'>{'<<'}</a></li>
                        {this.props.pages.map((p, i) => {
                            return <li className='page_list_number' key={i} onClick={() => this.props.requestPageNumber(p)}><a className='page_list_link' href='#'>{p}</a></li>
                        })}
                        <li className='page_list_number' key='-1' onClick={() => this.props.requestPageNumber(1)}><a className='page_list_link' href='#'>{'>>'}</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default PageNavigation;