import React from 'react';
import cx from 'classnames';

export const CommonCompo = (props) => {
    let lis = [];
    
    for (var i=1; i<5; i++) {
        let newVar = i; 
        lis.push( <div key={Math.random()} className={cx("process-point",{"active":( (props.currentPage && props.currentPage == i) || (i < props.currentPage)) ? true:false},
                                                     {"completed": (i < props.currentPage) ? true : false} )} >
                        <a onClick={(i < props.currentPage) ? (() => props.changePage(newVar)) : console.log('Can not redirect') } ></a>
                        <strong></strong>
                    </div>
                );
    }

    return (
        <div className="step-process d-flex">
            {lis}
        </div>
    )
}