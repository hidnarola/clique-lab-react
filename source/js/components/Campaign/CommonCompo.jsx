import React from 'react';
import cx from 'classnames';

export const CommonCompo = (props) => {    
    let lis = [];
    for (var i=1; i<=5; i++) {
        let newVar = i;
        if(i!==5){
            lis.push(<div key={Math.random()} className={cx("process-point",{"active":( (props.currentPage && props.currentPage == i) || (i < props.currentPage)) ? true:false},{"completed": (i < props.currentPage) ? true : false},{"current":( (props.currentPage && props.currentPage == i)) ? true:false} )} >
                        <a onClick={(i < props.currentPage) ? (() => props.changePage(newVar)) : console.log('Can not redirect') } ></a>
                        <strong></strong>
                    </div>
            );
        } else {
            lis.push(<div key={Math.random()} className={cx("process-point",{"active":( (props.currentPage && props.currentPage == i) || (i < props.currentPage)) ? true:false},{"completed": (i < props.currentPage) ? true : false},{"current":( (props.currentPage && props.currentPage == i)) ? true:false} )} >
                        <a onClick={(i < props.currentPage) ? (() => props.changePage(newVar)) : console.log('Can not redirect') } ></a>
                    </div>
            );
        }
    }

    return (
        <div className="step-process d-flex">
            {lis}
        </div>
    )
}


export const AfterReg = (props) => {
    let lis = [];
    
    for (var i=1; i<=2; i++) {
        let newVar = i;
        if(i!==2){
            lis.push(<a key={Math.random()} onClick={(i <= props.currentPage) ? (() => props.changePage(newVar)) : console.log('Can not redirect') } className={cx(" ",{"active":( (props.currentPage && props.currentPage == i) || (i < props.currentPage)) ? true:false},{"completed": (i < props.currentPage) ? true : false} )} ></a>);
        } else {
            lis.push(<a key={Math.random()} onClick={() => ((i-1) < props.currentPage) ? (() => props.changePage(newVar-1)) : (props.lastVisitedPage > props.currentPage) ? (() => props.changePage(newVar)) : console.log('Redirect..') } className={cx(" ",{"active":( (props.currentPage && props.currentPage == i) || (i < props.currentPage)) ? true:false},{"completed": (i < props.currentPage) ? true : false} )} ></a>);
        }
    }
    
    return (
        <div className="category-step d-flex">
            {lis}
        </div>
    )
}